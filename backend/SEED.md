# 🌱 Database Seeding Guide

## Overview
El archivo `seed.js` popula la base de datos MongoDB con datos de ejemplo para desarrollo y testing. Incluye:

- **50 Usuarios** - Con roles y perfiles diversos
- **10 Workspaces** - Espacios de trabajo con diferentes propósitos
- **50 Tableros** - Distribuidos en los workspaces
- **20 Listas** - Columnas dentro de los tableros
- **30 Tarjetas** - Tareas con subtasks, asignados, etiquetas
- **35 Archivos** - Asociados a diferentes recursos

## Prerequisites

1. ✅ MongoDB debe estar ejecutándose localmente en `mongodb://localhost:27017`
2. ✅ Archivo `.env` configurado con:
   ```
   MONGODB_URI=mongodb://localhost:27017/trello-clone
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=tu_clave_secreta
   ```
3. ✅ Dependencias instaladas: `npm install`

## Ejecución

### Opción 1: Usando npm script (Recomendado)
```bash
npm run seed
```

### Opción 2: Directo con Node
```bash
node seed.js
```

## Flujo de Seeding

El script ejecuta los siguientes pasos en orden:

```
1️⃣ Conexión a MongoDB
   ↓
2️⃣ Limpieza de colecciones (DELETE ALL)
   ↓
3️⃣ Carga de datos JSON
   ↓
4️⃣ Seeding de Usuarios (con contraseñas hasheadas)
   ↓
5️⃣ Seeding de Workspaces
   ↓
6️⃣ Seeding de Tableros
   ↓
7️⃣ Seeding de Listas
   ↓
8️⃣ Seeding de Tarjetas (con subtasks)
   ↓
9️⃣ Seeding de Archivos
   ↓
🔟 Actualización de referencias cruzadas
   ↓
✅ Completado
```

## Mapeo de Referencias

El script crea mapeos internos para resolver referencias:

- **userMap**: `username` → `_id`
- **workspaceMap**: `workspace name` → `_id`
- **boardMap**: `board title` → `_id`
- **listMap**: `"${boardTitle}|${listTitle}"` → `_id`

### Ejemplo de resolución de referencia:
```json
{
  "title": "Implement responsive navigation",
  "list": "To Do",          // Se convierte a ObjectId
  "creator": "sofia_frontend",  // Se convierte a ObjectId de User
  "assignees": ["carlos_design"],  // Se convierte a Array[ObjectId]
}
```

## Usuarios Seeded

### Usuarios con Nombre (10)
```
1. john_developer      (Senior Developer)
2. maria_pm           (Project Manager)
3. carlos_design      (UI/UX Designer)
4. ana_qa            (QA Engineer)
5. luis_backend       (Backend Developer)
6. sofia_frontend     (Frontend Developer)
7. diego_devops       (DevOps Engineer)
8. elena_analyst      (Data Analyst)
9. miguel_architect   (Solution Architect)
10. laura_scrum       (Scrum Master)
```

### Usuarios Genéricos (40)
```
user_11 a user_50
```

**Contraseña para todos**: `hashedPassword123` (hasheada con bcryptjs)

## Workspaces Incluidos

```
1. TechCorp Development
2. Frontend Development
3. Backend Infrastructure
4. QA Testing Zone
5. Design Team Hub
6. DevOps & Cloud
7. Architecture & Planning
8. Data Analytics
9. Agile & Scrum
10. Project Alpha
```

## Estructura de Datos

### User Document
```json
{
  "_id": ObjectId,
  "username": "string",
  "password": "bcrypt_hash",
  "profile": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "address": "string",
    "city": "string",
    "country": "string",
    "zipCode": "string",
    "phone": "string",
    "mobile": "string",
    "company": "string",
    "position": "string",
    "website": "string"
  },
  "active": true,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Workspace Document
```json
{
  "_id": ObjectId,
  "name": "string",
  "description": "string",
  "owner": ObjectId,
  "members": [
    {
      "userId": ObjectId,
      "role": "admin|member",
      "addedAt": ISODate
    }
  ],
  "boards": [ObjectId],
  "files": [ObjectId],
  "config": {
    "color": "#hex",
    "icon": "string"
  },
  "active": true,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Board Document
```json
{
  "_id": ObjectId,
  "title": "string",
  "description": "string",
  "workspace": ObjectId,
  "owner": ObjectId,
  "members": [
    {
      "userId": ObjectId,
      "role": "admin|editor|viewer",
      "addedAt": ISODate
    }
  ],
  "config": {
    "background": "#hex",
    "icon": "string"
  },
  "public": boolean,
  "archived": false,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### List Document
```json
{
  "_id": ObjectId,
  "title": "string",
  "board": ObjectId,
  "position": number,
  "config": {
    "color": "#hex"
  },
  "archived": false,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Card Document
```json
{
  "_id": ObjectId,
  "title": "string",
  "description": "string",
  "list": ObjectId,
  "creator": ObjectId,
  "assignees": [ObjectId],
  "watchers": [ObjectId],
  "labels": [
    { "name": "string", "color": "#hex" }
  ],
  "status": "open|in_progress|blocked|completed|archived",
  "priority": "low|medium|high|urgent",
  "startDate": ISODate,
  "position": number,
  "files": [ObjectId],
  "subtasks": [
    {
      "title": "string",
      "description": "string",
      "completed": boolean,
      "order": number,
      "assigned": ObjectId,
      "priority": "low|medium|high",
      "dueDate": ISODate,
      "createdAt": ISODate,
      "updatedAt": ISODate
    }
  ],
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### File Document
```json
{
  "_id": ObjectId,
  "name": "string",
  "originalName": "string",
  "mimetype": "string",
  "size": number,
  "path": "string",
  "url": "string",
  "uploadedBy": ObjectId,
  "resourceType": "card|board|user|other",
  "resourceId": ObjectId,
  "extension": "string",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

## Output Esperado

Cuando ejecutes `npm run seed`, deberías ver:

```
🌱 Iniciando seeding de base de datos...
✅ Conectado a MongoDB
🗑️ Limpiando colecciones existentes...
✅ Colecciones limpiadas
📂 Cargando datos desde archivos JSON...
✅ Datos cargados correctamente

👥 Seeding Users...
✅ 50 usuarios creados

🏢 Seeding Workspaces...
✅ 10 workspaces creados

📋 Seeding Boards...
✅ 50 tableros creados

📝 Seeding Lists...
✅ 20 listas creadas

🎴 Seeding Cards...
✅ 30 tarjetas creadas

📁 Seeding Files...
✅ 35 archivos creados

🔗 Actualizando referencias en Workspaces...
✅ Referencias de Workspaces actualizadas

============================================================
✅ SEEDING COMPLETADO EXITOSAMENTE
============================================================

📊 RESUMEN:
  👥 Usuarios:        50
  🏢 Workspaces:      10
  📋 Tableros:        50
  📝 Listas:          20
  🎴 Tarjetas:        30
  📁 Archivos:        35
  ──────────────────────
  📦 Total:           195 registros

💾 Base de datos populada correctamente
✨ ¡Listo para usar!
```

## Troubleshooting

### ❌ Error: "Cannot find module"
**Solución**: Asegúrate de estar en el directorio raíz del proyecto
```bash
cd reuscons4.0_BE
npm run seed
```

### ❌ Error: "MONGODB_URI is not defined"
**Solución**: Crea/verifica el archivo `.env`:
```bash
MONGODB_URI=mongodb://localhost:27017/trello-clone
NODE_ENV=development
PORT=5000
JWT_SECRET=tu_clave_secretísima
```

### ❌ Error: "MongoDB connection failed"
**Solución**: Verifica que MongoDB esté corriendo:
```bash
# En otra terminal, inicia MongoDB
mongod
```

### ❌ Error: "ENOENT: no such file or directory"
**Solución**: Verifica que existan los archivos JSON:
```bash
ls -la src/models/*/
```

Deberías ver:
- `src/models/user/users.json`
- `src/models/workspace/workspaces.json`
- `src/models/board/boards.json`
- `src/models/list/lists.json`
- `src/models/card/cards.json`
- `src/models/file/files.json`

## Removing Seeded Data

Para limpiar la base de datos sin ejecutar el seeding completo:

```javascript
// seed-clean.js
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './src/models/user/User.js';
import Workspace from './src/models/workspace/Workspace.js';
import Board from './src/models/board/Board.js';
import List from './src/models/list/List.js';
import Card from './src/models/card/Card.js';
import File from './src/models/file/File.js';

await mongoose.connect(process.env.MONGODB_URI);
await Promise.all([
  User.deleteMany({}),
  Workspace.deleteMany({}),
  Board.deleteMany({}),
  List.deleteMany({}),
  Card.deleteMany({}),
  File.deleteMany({})
]);
console.log('✅ Base de datos limpiada');
await mongoose.connection.close();
```

O desde MongoDB shell:
```bash
mongo
> use trello-clone
> db.users.deleteMany({})
> db.workspaces.deleteMany({})
> db.boards.deleteMany({})
> db.lists.deleteMany({})
> db.cards.deleteMany({})
> db.files.deleteMany({})
```

## Notes

- ✅ El script hashea automáticamente todas las contraseñas con bcryptjs
- ✅ Los IDs se generan automáticamente por MongoDB
- ✅ Los timestamps se asignan automáticamente por Mongoose
- ✅ Las referencias cruzadas se resuelven correctamente
- ⚠️ Ejecutar seed.js **elimina todos los datos existentes**

## Next Steps

Una vez seeded, puedes:

1. Iniciar el servidor: `npm run dev`
2. Acceder a `http://localhost:5000/api/health`
3. Usar los datos para testing/desarrollo
4. Integrar con el frontend (Trello clone)

---

**¡Happy Seeding! 🌱**
