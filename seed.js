import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Kanban, Tareas, Archivos, Obras, Users } from './src/lib/schemas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'reuscons';

const COLLECTIONS = [
	{
		name: 'kanbans',
		model: Kanban,
		file: 'src/data/kanban.json',
		dataKey: 'kanban_boards'
	},
		{
		name: 'users',
		model: Users,
		file: 'src/data/users.json',
		dataKey: 'users'
	},
	{
		name: 'tareas',
		model: Tareas,
		file: 'src/data/tasks.json',
		dataKey: 'tasks'
	},
	{
		name: 'archivos',
		model: Archivos,
		file: 'src/data/archivos.json',
		dataKey: 'archivos'
	},
	{
		name: 'obras',
		model: Obras,
		file: 'src/data/obras.json',
		dataKey: 'obras'
	}
];

async function seedDatabase() {
	try {
		// Conectar a MongoDB
		console.log(`🔗 Conectando a MongoDB: ${MONGODB_URI}/${MONGODB_DB}`);
		await mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`);
		console.log(`✅ Conectado a la base de datos: ${MONGODB_DB}\n`);

		// Limpiar colecciones existentes
		console.log('🧹 Limpiando colecciones existentes...');
		for (const collection of COLLECTIONS) {
			try {
				await collection.model.deleteMany({});
				console.log(`   ✓ Colección "${collection.name}" vaciada`);
			} catch (error) {
				console.log(`   ℹ Colección "${collection.name}" no existe (será creada)`);
			}
		}
		console.log();

		// Importar datos
		console.log('📥 Importando datos desde archivos JSON...\n');
		for (const collection of COLLECTIONS) {
			const filePath = path.join(__dirname, collection.file);

			// Leer archivo JSON
			if (!fs.existsSync(filePath)) {
				console.error(`   ❌ Archivo no encontrado: ${filePath}`);
				continue;
			}

			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const jsonData = JSON.parse(fileContent);

			// Obtener datos según la clave especificada
			const data = jsonData[collection.dataKey];

			if (!Array.isArray(data)) {
				console.error(`   ❌ Datos en "${collection.file}" no es un array válido`);
				continue;
			}

			// Insertar documentos
			if (data.length > 0) {
				const result = await collection.model.insertMany(data);
				console.log(`   ✅ Colección "${collection.name}": ${result.length} documentos insertados`);
			} else {
				console.log(`   ⚠️  Colección "${collection.name}": Sin datos para importar`);
			}
		}

		console.log('\n🎉 Seed completado exitosamente!');

		// Mostrar resumen
		console.log('\n📊 Resumen de la base de datos:');
		for (const collection of COLLECTIONS) {
			const count = await collection.model.countDocuments();
			console.log(`   • ${collection.name}: ${count} documentos`);
		}
	} catch (error) {
		console.error('\n❌ Error durante el seed:', error);
		process.exit(1);
	} finally {
		await mongoose.disconnect();
		console.log('\n✅ Conexión cerrada');
	}
}

// Ejecutar seed
seedDatabase().catch(error => {
	console.error('Error fatal:', error);
	process.exit(1);
});
