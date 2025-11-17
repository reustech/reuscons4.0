import mongoose from 'mongoose';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';

// Import Models
import User from './src/models/user/User.js';
import Workspace from './src/models/workspace/Workspace.js';
import Board from './src/models/board/Board.js';
import List from './src/models/list/List.js';
import Card from './src/models/card/Card.js';
import File from './src/models/file/File.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read JSON files
const readJSONFile = (filename) => {
  const filePath = path.join(__dirname, 'src/models', filename);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to hash passwords
const hashPassword = async (password) => {
  return await bcryptjs.hash(password, 10);
};

// Main seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Clear existing data
    console.log('🗑️ Limpiando colecciones existentes...');
    await Promise.all([
      User.deleteMany({}),
      Workspace.deleteMany({}),
      Board.deleteMany({}),
      List.deleteMany({}),
      Card.deleteMany({}),
      File.deleteMany({})
    ]);
    console.log('✅ Colecciones limpiadas');

    // Load JSON data
    console.log('📂 Cargando datos desde archivos JSON...');
    const usersData = readJSONFile('user/users.json');
    const workspacesData = readJSONFile('workspace/workspaces.json');
    const boardsData = readJSONFile('board/boards.json');
    const listsData = readJSONFile('list/lists.json');
    const cardsData = readJSONFile('card/cards.json');
    const filesData = readJSONFile('file/files.json');
    console.log('✅ Datos cargados correctamente');

    // ============================================
    // 1. SEED USERS
    // ============================================
    console.log('\n👥 Seeding Users...');
    const hashedUsers = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password)
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ ${createdUsers.length} usuarios creados`);

    // Create a mapping of username -> userId
    const userMap = {};
    createdUsers.forEach(user => {
      userMap[user.username] = user._id;
    });

    // ============================================
    // 2. SEED WORKSPACES
    // ============================================
    console.log('\n🏢 Seeding Workspaces...');
    const workspacesWithIds = workspacesData.map(workspace => ({
      ...workspace,
      owner: userMap[workspace.owner],
      members: workspace.members.map(member => ({
        userId: userMap[member.userId],
        role: member.role,
        addedAt: new Date(member.addedAt)
      }))
    }));
    const createdWorkspaces = await Workspace.insertMany(workspacesWithIds);
    console.log(`✅ ${createdWorkspaces.length} workspaces creados`);

    // Create a mapping of workspace name -> workspace ID
    const workspaceMap = {};
    createdWorkspaces.forEach(workspace => {
      workspaceMap[workspace.name] = workspace._id;
    });

    // ============================================
    // 3. SEED BOARDS
    // ============================================
    console.log('\n📋 Seeding Boards...');
    const boardsWithIds = boardsData.map(board => ({
      ...board,
      workspace: workspaceMap[board.workspace],
      owner: userMap[board.owner],
      members: board.members.map(member => ({
        userId: userMap[member.userId],
        role: member.role,
        addedAt: new Date(member.addedAt)
      }))
    }));
    const createdBoards = await Board.insertMany(boardsWithIds);
    console.log(`✅ ${createdBoards.length} tableros creados`);

    // Create a mapping of board title -> board ID
    const boardMap = {};
    createdBoards.forEach(board => {
      boardMap[board.title] = board._id;
    });

    // ============================================
    // 4. SEED LISTS
    // ============================================
    console.log('\n📝 Seeding Lists...');
    const listsWithIds = listsData.map(list => ({
      ...list,
      board: boardMap[list.board]
    }));
    const createdLists = await List.insertMany(listsWithIds);
    console.log(`✅ ${createdLists.length} listas creadas`);

    // Create a mapping of list title + board title -> list ID
    const listMap = {};
    createdLists.forEach(list => {
      const boardTitle = boardsData.find(b =>
        createdBoards.find(cb =>
          cb._id.equals(list.board) && cb.title === b.title
        )
      )?.title;
      const key = `${boardTitle}|${list.title}`;
      listMap[key] = list._id;
    });

    // ============================================
    // 5. SEED CARDS
    // ============================================
    console.log('\n🎴 Seeding Cards...');
    const cardsWithIds = cardsData.map(card => {
      const boardTitle = boardsData.find(b =>
        createdBoards.find(cb =>
          cb.title === b.title &&
          listsData.some(l => l.board === b.title && l.title === card.list)
        )
      )?.title;

      const listKey = `${boardTitle}|${card.list}`;

      return {
        ...card,
        list: listMap[listKey],
        creator: userMap[card.creator],
        assignees: card.assignees.map(username => userMap[username]),
        watchers: card.watchers.map(username => userMap[username]),
        subtasks: card.subtasks.map(subtask => ({
          ...subtask,
          assigned: subtask.assigned ? userMap[subtask.assigned] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      };
    });
    const createdCards = await Card.insertMany(cardsWithIds);
    console.log(`✅ ${createdCards.length} tarjetas creadas`);

    // ============================================
    // 6. SEED FILES
    // ============================================
    console.log('\n📁 Seeding Files...');
    const filesWithIds = filesData.map(file => {
      let resourceId = null;

      if (file.resourceType === 'board') {
        resourceId = boardMap[file.resourceId];
      } else if (file.resourceType === 'card') {
        const card = cardsData.find(c => c.title === file.resourceId);
        if (card) {
          const boardTitle = boardsData.find(b =>
            createdBoards.find(cb =>
              cb.title === b.title &&
              listsData.some(l => l.board === b.title && l.title === card.list)
            )
          )?.title;
          const createdCard = createdCards.find(cc =>
            cc.title === card.title
          );
          if (createdCard) {
            resourceId = createdCard._id;
          }
        }
      } else if (file.resourceType === 'user') {
        resourceId = userMap[file.resourceId];
      }

      return {
        ...file,
        uploadedBy: userMap[file.uploadedBy],
        resourceId: resourceId
      };
    });
    const createdFiles = await File.insertMany(filesWithIds);
    console.log(`✅ ${createdFiles.length} archivos creados`);

    // ============================================
    // Update Workspaces with Board References
    // ============================================
    console.log('\n🔗 Actualizando referencias en Workspaces...');
    for (const workspace of createdWorkspaces) {
      const workspaceName = workspace.name;
      const boardsInWorkspace = createdBoards.filter(board =>
        boardsData.find(b =>
          b.title === board.title &&
          b.workspace === workspaceName
        )
      );

      if (boardsInWorkspace.length > 0) {
        await Workspace.updateOne(
          { _id: workspace._id },
          { boards: boardsInWorkspace.map(b => b._id) }
        );
      }
    }
    console.log('✅ Referencias de Workspaces actualizadas');

    // ============================================
    // FINAL REPORT
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('✅ SEEDING COMPLETADO EXITOSAMENTE');
    console.log('='.repeat(60));
    console.log(`
📊 RESUMEN:
  👥 Usuarios:        ${createdUsers.length}
  🏢 Workspaces:      ${createdWorkspaces.length}
  📋 Tableros:        ${createdBoards.length}
  📝 Listas:          ${createdLists.length}
  🎴 Tarjetas:        ${createdCards.length}
  📁 Archivos:        ${createdFiles.length}
  ──────────────────────
  📦 Total:           ${
    createdUsers.length +
    createdWorkspaces.length +
    createdBoards.length +
    createdLists.length +
    createdCards.length +
    createdFiles.length
  } registros
    `);

    console.log('💾 Base de datos populada correctamente');
    console.log('✨ ¡Listo para usar!');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    if (error.name === 'ValidationError') {
      console.error('📋 Detalles de validación:', error.errors);
    }
    if (error.name === 'MongooseError') {
      console.error('🗄️ Error de Mongoose:', error.message);
    }
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run seeding
console.log('🌱 Iniciando seeding de base de datos...');
seedDatabase();
