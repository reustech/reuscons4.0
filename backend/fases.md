# Fases de Desarrollo - Clon de Trello Backend

## Resumen Ejecutivo
Este documento detalla las 7 fases de desarrollo del backend del clon de Trello. Cada fase está desglosada en tareas específicas con archivos a crear/modificar.

**Stack Final:**
- Express.js (API REST)
- Mongoose (ODM para MongoDB)
- JWT stateless (Autenticación)
- MongoDB Local (puerto 27017)
- ES6 Modules (import/export)
- Arquitectura MVC por recurso
- Frontend: Astro (será consumidor de esta API)

---

## Estructura MVC por Recurso

La estructura sigue el patrón **MVC (Model-View-Controller)** organizando cada recurso independientemente:

```
src/
├── shared/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── permissions.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── responses.js
│   │   ├── queries.js
│   │   └── logger.js
│   └── config/
│       └── database.js
├── resources/
│   ├── users/
│   │   ├── model.js
│   │   ├── controller.js
│   │   └── routes.js
│   ├── workspaces/
│   │   ├── model.js
│   │   ├── controller.js
│   │   └── routes.js
│   ├── boards/
│   │   ├── model.js
│   │   ├── controller.js
│   │   └── routes.js
│   ├── columns/
│   │   ├── model.js
│   │   ├── controller.js
│   │   └── routes.js
│   ├── cards/
│   │   ├── model.js
│   │   ├── controller.js
│   │   └── routes.js
│   └── files/
│       ├── model.js
│       ├── controller.js
│       └── routes.js
├── app.js
└── server.js
```

### Ventajas de esta estructura:
- **Escalabilidad**: Agregar nuevos recursos es simple
- **Mantenibilidad**: Todo relacionado a un recurso en un lugar
- **Modularidad**: Cada recurso es independiente
- **Reutilización**: Shared contiene código transversal

---

## FASE 1: Configuración Inicial

### Objetivo
Preparar el proyecto con estructura MVC, dependencias e inicialización de MongoDB.

### Tareas

#### 1.1 Inicializar proyecto npm
```bash
npm init -y
```

#### 1.2 Instalar dependencias principales
```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
```

#### 1.3 Instalar dependencias de desarrollo
```bash
npm install --save-dev nodemon
```

#### 1.4 Crear estructura de carpetas
```bash
mkdir -p src/shared/{middleware,utils,config}
mkdir -p src/resources/{users,boards,lists,cards}
```

#### 1.5 Archivos a crear

**`package.json`** - Actualizar con `"type": "module"` y scripts:
```json
{
  "name": "trello-clone-backend",
  "version": "1.0.0",
  "description": "Backend para clon de Trello",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^8.0.0",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

**`.env`** - Variables de entorno:
```
MONGODB_URI=mongodb://localhost:27017/trello-clone
JWT_SECRET=tu_clave_secreta_super_segura_aqui_cambiar_en_produccion
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**`.env.example`** - Template sin valores sensibles:
```
MONGODB_URI=mongodb://localhost:27017/trello-clone
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**`.gitignore`** - Ya existe, verificar que incluya:
```
node_modules/
.env
.env.local
.DS_Store
*.log
dist/
```

**`src/shared/config/database.js`** - Conexión a MongoDB (ES6):
```javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
```

**`src/shared/utils/responses.js`** - Respuestas estandarizadas:
```javascript
export const successResponse = (res, data = null, message = 'Éxito', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

export const errorResponse = (res, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};
```

**`src/app.js`** - Configuración de Express (ES6):
```javascript
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK ✅' });
});

export default app;
```

**`server.js`** - Punto de entrada (ES6):
```javascript
import app from './src/app.js';
import { connectDB } from './src/shared/config/database.js';

const PORT = process.env.PORT || 5000;

// Conectar a BD e iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});
```

### Validación Fase 1
- [ ] Proyecto npm inicializado con `"type": "module"`
- [ ] Todas las dependencias instaladas
- [ ] Estructura MVC de carpetas creada
- [ ] Archivos de configuración listos
- [ ] Servidor inicia sin errores (`npm run dev`)
- [ ] Endpoint `/api/health` responde correctamente

---

## FASE 2: Autenticación (Users)

### Objetivo
Implementar registro, login y middleware de autenticación con JWT.

### Tareas

#### 2.1 Crear modelo User
**`src/resources/users/model.js`**

Campos:
- email (String, único, requerido)
- password (String, requerido, hasheado)
- nombre (String, requerido)
- createdAt (Date, automático)
- updatedAt (Date, automático)

Pre-hook para hashear password con bcryptjs.

Ejemplo de estructura:
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// Índice en email
userSchema.index({ email: 1 });

// Pre-hook para hashear password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Método para obtener usuario sin contraseña
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);
```

#### 2.2 Crear controlador de autenticación
**`src/resources/users/controller.js`**

Funciones:
- `register(req, res)` - Crear nuevo usuario
- `login(req, res)` - Generar JWT token
- `getMe(req, res)` - Obtener usuario actual (autenticado)

Usar estructura:
```javascript
import User from './model.js';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../../shared/utils/responses.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export const register = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    // Validaciones básicas
    if (!email || !password || !nombre) {
      return errorResponse(res, 'Campos requeridos: email, password, nombre', 400);
    }

    // Verificar si usuario existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 'El email ya está registrado', 409);
    }

    // Crear usuario
    const user = await User.create({ email, password, nombre });
    const token = generateToken(user._id);

    successResponse(res, { user: user.toJSON(), token }, 'Usuario registrado correctamente', 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return errorResponse(res, 'Email y contraseña requeridos', 400);
    }

    // Buscar usuario
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Credenciales inválidas', 401);
    }

    // Verificar contraseña
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Credenciales inválidas', 401);
    }

    const token = generateToken(user._id);
    successResponse(res, { user: user.toJSON(), token }, 'Sesión iniciada correctamente', 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    successResponse(res, { user }, 'Usuario obtenido correctamente', 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};
```

#### 2.3 Crear middleware de autenticación
**`src/shared/middleware/auth.js`**

```javascript
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responses.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return errorResponse(res, 'Token no proporcionado', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    errorResponse(res, 'Token inválido', 401);
  }
};
```

#### 2.4 Crear rutas de autenticación
**`src/resources/users/routes.js`**

```javascript
import express from 'express';
import { register, login, getMe } from './controller.js';
import { authMiddleware } from '../../shared/middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

export default router;
```

#### 2.5 Integrar rutas en app.js
Agregar en `src/app.js`:
```javascript
import usersRoutes from './resources/users/routes.js';

app.use('/api/users', usersRoutes);
```

### Validación Fase 2
- [ ] Modelo User creado con validaciones
- [ ] Passwords hasheados correctamente
- [ ] Registro funciona, crea usuario en BD
- [ ] Login genera JWT válido
- [ ] JWT se valida correctamente
- [ ] Endpoint `/api/users/me` protegido funciona
- [ ] Endpoints retornan errores apropiados

---

## FASE 3: Tableros (Boards)

### Objetivo
Implementar CRUD completo de tableros con gestión de propietarios y miembros.

### Tareas

#### 3.1 Crear modelo Board
**`src/resources/boards/model.js`**

```javascript
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

boardSchema.index({ owner: 1 });
boardSchema.index({ members: 1 });

export default mongoose.model('Board', boardSchema);
```

#### 3.2 Crear controlador de boards
**`src/resources/boards/controller.js`**

Funciones:
- `getBoards(req, res)` - Listar tableros del usuario (owner o member)
- `createBoard(req, res)` - Crear tablero (usuario es owner)
- `getBoardById(req, res)` - Obtener detalles del tablero
- `updateBoard(req, res)` - Actualizar (solo owner)
- `deleteBoard(req, res)` - Eliminar (solo owner)
- `addMember(req, res)` - Agregar miembro (solo owner)

#### 3.3 Crear middleware de permisos
**`src/shared/middleware/permissions.js`**

```javascript
import Board from '../../resources/boards/model.js';
import { errorResponse } from '../utils/responses.js';

export const isBoardOwner = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return errorResponse(res, 'Tablero no encontrado', 404);
    }

    if (board.owner.toString() !== req.user.id) {
      return errorResponse(res, 'No tienes permiso para hacer esto', 403);
    }

    req.board = board;
    next();
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

export const isBoardMember = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id || req.params.boardId);

    if (!board) {
      return errorResponse(res, 'Tablero no encontrado', 404);
    }

    const isMember = board.owner.toString() === req.user.id ||
                     board.members.some(m => m.toString() === req.user.id);

    if (!isMember) {
      return errorResponse(res, 'No tienes acceso a este tablero', 403);
    }

    req.board = board;
    next();
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};
```

#### 3.4 Crear rutas de boards
**`src/resources/boards/routes.js`**

```javascript
import express from 'express';
import { authMiddleware } from '../../shared/middleware/auth.js';
import { isBoardOwner, isBoardMember } from '../../shared/middleware/permissions.js';
import * as boardController from './controller.js';

const router = express.Router();

router.get('/', authMiddleware, boardController.getBoards);
router.post('/', authMiddleware, boardController.createBoard);
router.get('/:id', authMiddleware, isBoardMember, boardController.getBoardById);
router.put('/:id', authMiddleware, isBoardOwner, boardController.updateBoard);
router.delete('/:id', authMiddleware, isBoardOwner, boardController.deleteBoard);
router.post('/:id/members', authMiddleware, isBoardOwner, boardController.addMember);

export default router;
```

#### 3.5 Integrar rutas en app.js
Agregar en `src/app.js`:
```javascript
import boardRoutes from './resources/boards/routes.js';

app.use('/api/boards', boardRoutes);
```

### Validación Fase 3
- [ ] Modelo Board con relaciones correctas
- [ ] Crear tablero funciona, se asigna owner
- [ ] Listar solo tableros del usuario (owner o member)
- [ ] Solo owner puede editar/eliminar
- [ ] Agregar miembros funciona
- [ ] Validaciones de permisos funcionan
- [ ] Respuestas HTTP adecuadas

---

## FASE 4: Columnas (Columns)

### Objetivo
Implementar CRUD de columnas dentro de tableros con reordenamiento.

### Tareas

#### 4.1 Crear modelo Column
**`src/resources/columns/model.js`**

```javascript
import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  posicion: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

columnSchema.index({ board: 1 });
columnSchema.index({ posicion: 1 });

export default mongoose.model('Column', columnSchema);
```

#### 4.2 Crear controlador de columns
**`src/resources/columns/controller.js`**

Funciones:
- `getColumnsByBoard(req, res)` - Listar columnas de un tablero
- `createColumn(req, res)` - Crear columna en tablero
- `updateColumn(req, res)` - Actualizar columna
- `deleteColumn(req, res)` - Eliminar columna (y sus tarjetas)
- `reorderColumns(req, res)` - Reordenar columnas

#### 4.3 Crear rutas de columns
**`src/resources/columns/routes.js`**

```javascript
import express from 'express';
import { authMiddleware } from '../../shared/middleware/auth.js';
import { isBoardMember } from '../../shared/middleware/permissions.js';
import * as columnController from './controller.js';

const router = express.Router();

router.get('/board/:boardId', authMiddleware, isBoardMember, columnController.getColumnsByBoard);
router.post('/', authMiddleware, columnController.createColumn);
router.put('/:id', authMiddleware, columnController.updateColumn);
router.delete('/:id', authMiddleware, columnController.deleteColumn);
router.put('/:id/reorder', authMiddleware, columnController.reorderColumns);

export default router;
```

#### 4.4 Validar permisos
- Usuario debe ser member o owner del tablero
- Al eliminar columna, eliminar tarjetas asociadas en cascada

#### 4.5 Integrar rutas en app.js
Agregar en `src/app.js`:
```javascript
import columnRoutes from './resources/columns/routes.js';

app.use('/api/columns', columnRoutes);
```

### Validación Fase 4
- [ ] Modelo Column creado correctamente
- [ ] Solo members/owner del board pueden ver/crear columnas
- [ ] CRUD funciona correctamente
- [ ] Reordenamiento de columnas funciona
- [ ] Eliminar columna elimina tarjetas en cascada
- [ ] Validaciones de permisos funcionan

---

## FASE 5: Tarjetas (Cards)

### Objetivo
Implementar CRUD completo de tarjetas con asignación de usuarios y manejo avanzado.

### Tareas

#### 5.1 Crear modelo Card
**`src/resources/cards/model.js`**

```javascript
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  dueDate: {
    type: Date,
    default: null
  },
  labels: [{
    type: String,
    trim: true
  }],
  posicion: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

cardSchema.index({ column: 1 });
cardSchema.index({ assignee: 1 });
cardSchema.index({ posicion: 1 });

export default mongoose.model('Card', cardSchema);
```

#### 5.2 Crear controlador de cards
**`src/resources/cards/controller.js`**

Funciones:
- `getCardsByColumn(req, res)` - Listar tarjetas de una columna
- `createCard(req, res)` - Crear tarjeta
- `getCardById(req, res)` - Obtener detalles de tarjeta
- `updateCard(req, res)` - Actualizar tarjeta
- `deleteCard(req, res)` - Eliminar tarjeta
- `moveCard(req, res)` - Mover tarjeta entre columnas
- `assignCard(req, res)` - Asignar a usuario
- `reorderCards(req, res)` - Reordenar tarjetas en columna

#### 5.3 Crear rutas de cards
**`src/resources/cards/routes.js`**

```javascript
import express from 'express';
import { authMiddleware } from '../../shared/middleware/auth.js';
import * as cardController from './controller.js';

const router = express.Router();

router.get('/column/:columnId', authMiddleware, cardController.getCardsByColumn);
router.post('/', authMiddleware, cardController.createCard);
router.get('/:id', authMiddleware, cardController.getCardById);
router.put('/:id', authMiddleware, cardController.updateCard);
router.delete('/:id', authMiddleware, cardController.deleteCard);
router.put('/:id/move', authMiddleware, cardController.moveCard);
router.put('/:id/assign', authMiddleware, cardController.assignCard);
router.put('/:id/reorder', authMiddleware, cardController.reorderCards);

export default router;
```

#### 5.4 Validar permisos
- Usuario debe ser member o owner del tablero (a través de la columna)
- Solo assignee o owner puede cambiar asignación

#### 5.5 Integrar rutas en app.js
Agregar en `src/app.js`:
```javascript
import cardRoutes from './resources/cards/routes.js';

app.use('/api/cards', cardRoutes);
```

### Validación Fase 5
- [ ] Modelo Card creado correctamente
- [ ] CRUD completo funciona
- [ ] Mover tarjetas entre listas funciona
- [ ] Asignación de usuarios funciona
- [ ] Reordenamiento funciona
- [ ] Validaciones de permisos funcionan
- [ ] Respuestas incluyen datos relacionados (populate)

---

## FASE 6: Validación y Manejo de Errores

### Objetivo
Implementar validación robusta y manejo centralizado de errores.

### Tareas

#### 6.1 Crear validadores
**`src/shared/utils/validators.js`**

```javascript
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateBoardData = (data) => {
  if (!data.titulo || typeof data.titulo !== 'string' || !data.titulo.trim()) {
    return 'Título de tablero inválido';
  }
  return null;
};

export const validateListData = (data) => {
  if (!data.titulo || typeof data.titulo !== 'string' || !data.titulo.trim()) {
    return 'Título de lista inválido';
  }
  if (!data.board) {
    return 'ID de tablero requerido';
  }
  return null;
};

export const validateCardData = (data) => {
  if (!data.titulo || typeof data.titulo !== 'string' || !data.titulo.trim()) {
    return 'Título de tarjeta inválido';
  }
  if (!data.list) {
    return 'ID de lista requerido';
  }
  return null;
};
```

#### 6.2 Crear middleware de errores
**`src/shared/middleware/errorHandler.js`**

```javascript
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(`[ERROR] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

// Middleware para rutas no encontradas
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    data: null
  });
};
```

#### 6.3 Actualizar todos los controllers
- Usar validadores en entrada
- Usar respuestas estandarizadas
- Manejar errores apropiadamente

#### 6.4 Agregar middleware de errores a app.js
Al final de `src/app.js`:
```javascript
import { errorHandler, notFoundHandler } from './shared/middleware/errorHandler.js';

// Después de todas las rutas
app.use(notFoundHandler);
app.use(errorHandler);
```

### Validación Fase 6
- [ ] Todas las entradas se validan
- [ ] Errores devuelven mensajes claros
- [ ] Status codes HTTP correctos
- [ ] Errores sensibles no exponen info de BD
- [ ] Stack traces no visibles en producción

---

## FASE 7: Optimización y Seguridad

### Objetivo
Mejorar performance, seguridad y preparar para producción.

### Tareas

#### 7.1 Crear índices en BD
Los índices ya están en los esquemas con `.index()`

Verificar:
- User: índice en email
- Board: índices en owner, members
- List: índices en board, posicion
- Card: índices en list, assignee, posicion

#### 7.2 Optimizar queries
**`src/shared/utils/queries.js`**

```javascript
export const getBoardsOptimized = (userId) => {
  return Board.find({
    $or: [
      { owner: userId },
      { members: userId }
    ]
  })
  .select('titulo descripcion owner members')
  .lean();
};

export const getListsWithCards = (boardId) => {
  return List.find({ board: boardId })
    .populate({
      path: 'board',
      select: 'titulo owner members'
    })
    .lean();
};
```

#### 7.3 Seguridad
**`src/shared/middleware/security.js`**

```javascript
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login, intenta más tarde'
});

// Middleware para validar entrada
export const sanitizeInput = (req, res, next) => {
  // Implementar sanitización si es necesario
  next();
};
```

#### 7.4 Logging
**`src/shared/utils/logger.js`**

```javascript
export const logRequest = (method, url, userId) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url} - User: ${userId || 'anonymous'}`);
};

export const logError = (error, context) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR in ${context}:`, error.message);
};
```

#### 7.5 Variables de entorno
Validar que existan en `server.js`:
```javascript
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Variable de entorno ${envVar} no definida`);
    process.exit(1);
  }
});
```

#### 7.6 Documentación API
**`API.md`**

- Documentar todos los endpoints
- Ejemplos de requests/responses
- Códigos de error

### Validación Fase 7
- [ ] Índices en BD creados
- [ ] Queries optimizadas
- [ ] Seguridad implementada
- [ ] Logging funciona
- [ ] .env validado
- [ ] Documentación completa
- [ ] API lista para producción

---

## Estructura de Carpetas Final

```
reuscons4.0_BE/
├── src/
│   ├── shared/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── permissions.js
│   │   │   ├── errorHandler.js
│   │   │   └── security.js
│   │   └── utils/
│   │       ├── responses.js
│   │       ├── validators.js
│   │       ├── queries.js
│   │       └── logger.js
│   ├── resources/
│   │   ├── users/
│   │   │   ├── model.js
│   │   │   ├── controller.js
│   │   │   └── routes.js
│   │   ├── workspaces/
│   │   │   ├── model.js
│   │   │   ├── controller.js
│   │   │   └── routes.js
│   │   ├── boards/
│   │   │   ├── model.js
│   │   │   ├── controller.js
│   │   │   └── routes.js
│   │   ├── columns/
│   │   │   ├── model.js
│   │   │   ├── controller.js
│   │   │   └── routes.js
│   │   ├── cards/
│   │   │   ├── model.js
│   │   │   ├── controller.js
│   │   │   └── routes.js
│   │   └── files/
│   │       ├── model.js
│   │       ├── controller.js
│   │       └── routes.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── server.js
├── package.json
├── package-lock.json
├── claude.md
├── fases.md
└── API.md
```

---

## Notas Importantes

### Relaciones Mongoose
- Usar `.populate()` para traer datos relacionados
- Tener cuidado con poblamiento recursivo
- Considerar denormalización si es necesario para performance

### Validación de Permisos
Middleware reutilizable en `src/shared/middleware/permissions.js`:
- `isBoardOwner` - Verificar si usuario es dueño de tablero
- `isBoardMember` - Verificar si usuario es miembro

### Estructura MVC
- **Model**: Define la estructura de datos
- **Controller**: Lógica de negocio
- **Routes**: Mapeo de endpoints

### Manejo de Cascada
- Eliminar board → eliminar lists → eliminar cards
- Usar middleware pre/post de Mongoose

### Testing Manual
- Usar Postman o Insomnia
- Documentar requests con ejemplos
- Probar casos de error

---

## Timeline Recomendado
- **Fase 1**: 30 min
- **Fase 2**: 1.5 horas
- **Fase 3**: 1 hora
- **Fase 4**: 1 hora
- **Fase 5**: 1.5 horas
- **Fase 6**: 1.5 horas
- **Fase 7**: 1.5 horas

**Total estimado: 8 horas**

---

## Próximo Paso
Comenzar con **FASE 1: Configuración Inicial**
