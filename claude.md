# Contexto del Proyecto - Reuscons 4.0 (Monorepo)

## 📋 Descripción General

**Proyecto**: Reuscons 4.0 - Clon de Trello
**Tipo**: Monorepo (Frontend + Backend)
**Rama**: main
**Estado**: En desarrollo

---

## 🏗️ Estructura General del Monorepo

```
reuscons4.0/
├── frontend/                          # Aplicación cliente (Astro + React)
├── backend/                           # API REST (Express + MongoDB)
├── shared/                            # Código compartido (schemas, modelos)
│   ├── schemas/                       # Esquemas de validación (Zod)
│   │   ├── validation.schemas.js      # Re-export para compatibilidad
│   │   └── index.js                   # Índice centralizado
│   └── models/                        # Modelos de datos (MongoDB)
│       ├── board/
│       ├── card/
│       ├── file/
│       ├── list/
│       ├── user/
│       └── workspace/
├── package.json                       # Root package (workspaces)
└── claude.md                          # Este archivo
```

### 📦 Configuración de Workspaces

```json
{
  "name": "ikanban",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ]
}
```

**Nota**: La carpeta `shared/` no es un workspace de npm, sino un directorio compartido con archivos y esquemas comunes.

---

---

# 🎨 FRONTEND

## 📋 Descripción

- **Nombre**: `helpless-houston` (reuscons4.0-frontend)
- **Framework**: Astro 5.15.4
- **UI Framework**: React 19.2.0
- **Validación**: Zod + React Hook Form
- **Icons**: Lucide React
- **Estado**: Frontend puro con localStorage (sin backend conectado aún)

## 🏗️ Estructura del Frontend

```
frontend/
├── public/                            # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── Composed/                  # Componentes compuestos (React)
│   │   │   ├── DashboardAdmin/        # Dashboard administrativo
│   │   │   ├── DashboardUser/         # Dashboard de usuarios
│   │   │   ├── Kanban/                # Componente principal Kanban
│   │   │   └── Login/                 # Componente de login
│   │   ├── Modals/                    # Modales CRUD
│   │   │   ├── projects/              # CreateProjectModal, EditProjectModal
│   │   │   ├── users/                 # CreateUserModal, EditUserModal
│   │   │   ├── files/
│   │   │   ├── tasks/
│   │   │   └── kanban/
│   │   └── UI/                        # Componentes reutilizables
│   │       ├── Button/
│   │       ├── Input/
│   │       └── ...
│   ├── pages/ (Astro)
│   │   ├── index.astro                # Redirige a /Login
│   │   ├── Login/index.astro
│   │   ├── Dashboard/index.astro
│   │   ├── DashboardAdmin/index.astro
│   │   ├── Kanban/index.astro
│   │   └── Archivos/index.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── styles/
│   │   └── global.css                 # Variables CSS globales
│   ├── hooks/                         # Custom React hooks
│   ├── schemas/                       # Esquemas de validación (Zod)
│   └── data/                          # Archivos JSON de datos iniciales
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📦 Dependencias Principales (Frontend)

```json
{
  "astro": "^5.15.4",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@astrojs/react": "^4.4.2",
  "@hookform/resolvers": "^5.2.2",
  "react-hook-form": "^7.66.0",
  "zod": "^3.x.x",
  "lucide-react": "^0.553.0",
  "@lucide/astro": "^0.553.0",
  "@picocss/pico": "^2.0.3"
}
```

## 🚀 Scripts Frontend

```bash
npm run dev      # Inicia servidor de desarrollo (localhost:4321)
npm run build    # Build para producción
npm run preview  # Vista previa del build
npm run astro    # Acceso a comandos CLI de Astro
```

## 🌐 Rutas Frontend

| Ruta | Componente | Descripción |
|------|-----------|------------|
| `/` | - | Redirige a `/Login` |
| `/Login` | `Login/index.astro` | Autenticación cliente |
| `/Dashboard` | `Dashboard/index.astro` | Panel de usuario regular |
| `/DashboardAdmin` | `DashboardAdmin/index.astro` | Panel administrativo |
| `/Kanban` | `Kanban/index.astro` | Gestor de tareas Kanban |
| `/Archivos` | `Archivos/index.astro` | Gestor de archivos |

## 🎯 Componentes Principales (Frontend)

### 1. **Kanban Component**
- Ubicación: `src/components/Composed/Kanban/Kanban.jsx`
- Características:
  - Drag & drop HTML5 nativo
  - Modales para agregar/editar tareas
  - Persistencia con localStorage
  - Gestión de estado con React hooks

### 2. **Dashboard Admin**
- Ubicación: `src/components/Composed/DashboardAdmin/`
- Características:
  - CRUD de usuarios
  - Gestión de proyectos
  - Estadísticas
  - Integración de modales

### 3. **Modales CRUD**
- **Proyectos**: CreateProjectModal, EditProjectModal
- **Usuarios**: CreateUserModal, EditUserModal
- **Archivos**: CreateFileModal, EditFileModal
- Validación con Zod + React Hook Form

## 🔐 Autenticación (Frontend)

**Tipo**: Cliente-side (sin backend)

**Credenciales de prueba**:
- Admin: `usuario: admin`, `contraseña: admin` → `/DashboardAdmin`
- Usuario: cualquier otra combinación → `/Dashboard`

**Características**:
- Cookies HTTP-only (24 horas)
- Validación de campos requeridos
- Redirección condicional según rol

## 📊 Almacenamiento (Frontend)

**Método**: localStorage del navegador

**Datos soportados**:
- Usuarios
- Proyectos
- Tareas Kanban
- Archivos
- Obras/Workspaces

## 🎨 Estilos (Frontend)

- Variables CSS globales en `src/styles/global.css`
- Estilos inline en componentes React
- Framework: PicoCSS (opcional)
- Sistema de colores centralizado

## 📝 Notas Importantes (Frontend)

✓ Uso de `client:load` en Astro para componentes React interactivos
✓ Gestión de estado con `useState`, `useCallback` de React
✓ Validación con Zod + React Hook Form
✓ FileReader API para manejo de archivos
✓ SSR-safe: `typeof window === 'undefined'` en localStorage
✓ Interfaz completamente en español

---

---

# 🔧 BACKEND

## 📋 Descripción

- **Nombre**: `trello-clone-backend`
- **Framework**: Express.js (v5.1.0)
- **Base de Datos**: MongoDB (local)
- **ODM**: Mongoose (v8.19.3)
- **Autenticación**: JWT
- **Hash de Contraseñas**: bcryptjs
- **Estado**: En desarrollo

## 🏗️ Estructura del Backend

```
backend/
├── src/
│   ├── app.js                         # Configuración de Express
│   └── shared/
│       ├── config/
│       │   └── database.js            # Conexión a MongoDB
│       └── utils/
│           ├── responses.js           # Respuestas estandarizadas
│           ├── validators.js          # Validaciones
│           ├── queries.js             # Queries optimizadas
│           └── logger.js              # Logging
├── seed/                              # Scripts de seeding
├── .env                               # Variables de entorno
├── .env.example                       # Template de .env
├── server.js                          # Punto de entrada
├── package.json
├── package-lock.json
├── claude.md                          # Plan de backend
├── fases.md                           # Guía de implementación
└── SCHEMAS.md                         # Documentación de schemas
```

## 📦 Dependencias Principales (Backend)

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "dotenv": "^17.2.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5"
}
```

## 🚀 Scripts Backend

```bash
npm run dev      # Inicia con nodemon (localhost:5000)
npm run start    # Inicia servidor
npm run seed     # Ejecuta script de seeding
```

## 📡 Endpoints de la API

### Autenticación (Users)
```
POST   /api/users/register     - Registrar usuario
POST   /api/users/login        - Iniciar sesión
GET    /api/users/me           - Usuario actual
```

### Workspaces
```
GET    /api/workspaces         - Listar workspaces
POST   /api/workspaces         - Crear workspace
GET    /api/workspaces/:id     - Obtener detalles
PUT    /api/workspaces/:id     - Actualizar
DELETE /api/workspaces/:id     - Eliminar
POST   /api/workspaces/:id/members - Agregar miembro
```

### Tableros (Boards)
```
GET    /api/boards             - Listar tableros
POST   /api/boards             - Crear tablero
GET    /api/boards/:id         - Obtener detalles
PUT    /api/boards/:id         - Actualizar
DELETE /api/boards/:id         - Eliminar
POST   /api/boards/:id/members - Agregar miembro
```

### Columnas (Columns)
```
GET    /api/columns/board/:boardId      - Listar columnas
POST   /api/columns                     - Crear columna
PUT    /api/columns/:id                 - Actualizar
DELETE /api/columns/:id                 - Eliminar
PUT    /api/columns/:id/reorder         - Reordenar
```

### Tarjetas (Cards)
```
GET    /api/cards/column/:columnId      - Listar tarjetas
POST   /api/cards                       - Crear tarjeta
GET    /api/cards/:id                   - Obtener detalles
PUT    /api/cards/:id                   - Actualizar
DELETE /api/cards/:id                   - Eliminar
PUT    /api/cards/:id/move              - Mover entre columnas
PUT    /api/cards/:id/assign            - Asignar usuario
```

### Archivos (Files)
```
POST   /api/files/upload                - Subir archivo
GET    /api/files/:id                   - Descargar
DELETE /api/files/:id                   - Eliminar
GET    /api/files/resource/:type/:id    - Listar por recurso
```

## 🗄️ Modelos de Base de Datos

### User
```javascript
{
  _id: ObjectId,
  email: String (único),
  password: String (hasheado),
  nombre: String,
  profile: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Board
```javascript
{
  _id: ObjectId,
  titulo: String,
  descripcion: String,
  owner: ObjectId (User),
  members: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Workspace
```javascript
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  owner: ObjectId (User),
  members: [ObjectId],
  boards: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Column
```javascript
{
  _id: ObjectId,
  titulo: String,
  board: ObjectId (Board),
  posicion: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Card
```javascript
{
  _id: ObjectId,
  titulo: String,
  descripcion: String,
  column: ObjectId (Column),
  assignee: ObjectId (User),
  dueDate: Date,
  labels: [String],
  posicion: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### File
```javascript
{
  _id: ObjectId,
  filename: String,
  originalName: String,
  mimetype: String,
  size: Number,
  path: String,
  uploadedBy: ObjectId (User),
  resourceType: String (enum),
  resourceId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Seguridad (Backend)

✓ Contraseñas hasheadas con bcryptjs
✓ JWT para autenticación sin estado
✓ CORS configurado
✓ Middleware de errores centralizado
✓ Validación de permisos en cada operación

## 🌍 Variables de Entorno (Backend)

```bash
# Base de Datos
MONGODB_URI=mongodb://localhost:27017/reuscons

# JWT
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRE=7d

# Puerto
PORT=5000

# Entorno
NODE_ENV=development
```

## 📊 Estado de Implementación (Backend)

- ✅ Estructura de carpetas
- ✅ Conexión a MongoDB
- ✅ Modelos base
- ✅ Script de seeding
- ⏳ Endpoints de API (en desarrollo)
- ⏳ Middleware de autenticación
- ⏳ Validaciones

---

---

# 🔄 Integración Monorepo

## 📂 Carpeta Compartida: `shared/`

La carpeta `shared/` contiene código reutilizable entre frontend y backend:

### Esquemas (`shared/schemas/`)
```
shared/schemas/
├── validation.schemas.js    # Re-export para compatibilidad
├── index.js                 # Índice centralizado
└── [otros schemas]
```

**Uso en Frontend**:
```javascript
import { SCHEMAS } from '../../../shared/schemas/validation.schemas';
```

**Uso en Backend**:
```javascript
// A implementar cuando sea necesario
```

### Modelos (`shared/models/`)
```
shared/models/
├── user/
├── board/
├── card/
├── column/
├── file/
└── workspace/
```

Contienen definiciones de datos comunes entre frontend y backend.

## 🔧 Rutas de Importación Correctas

**Desde Frontend hacia Shared**:
```javascript
// ✅ Correcto
import { SCHEMAS } from '../../../shared/schemas/validation.schemas';

// ❌ Incorrecto (no existe)
import { SCHEMAS } from '../../../schemas/validation.schemas';
```

**Desde Backend hacia Shared**:
```javascript
// ✅ A implementar según necesidad
import models from '../../../shared/models';
```

---

---

# 📋 Tareas Pendientes

## Frontend

- [ ] Dashboard de usuario completo
- [ ] Modales vacíos/incompletos:
  - [ ] EditFileModal
  - [ ] EditKanbanModal
  - [ ] Más...
- [ ] Notificaciones/Toasts
- [ ] Responsive design
- [ ] Tema oscuro/claro
- [ ] Testing E2E

## Backend

- [ ] Implementar endpoints de API
- [ ] Middleware de autenticación JWT
- [ ] Validaciones completas
- [ ] Manejo de errores
- [ ] Tests unitarios
- [ ] Documentación de API

## Monorepo

- [ ] Configurar comunicación frontend ↔ backend
- [ ] Compartir esquemas entre front/back
- [ ] Seeding inicial de datos
- [ ] Documentación general

---

---

# 🚀 Próximos Pasos

1. Conectar Frontend con Backend API
2. Implementar autenticación JWT en backend
3. Completar endpoints de API
4. Crear tests
5. Desplegar en producción

