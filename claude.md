# Contexto del Proyecto - Reuscons 4.0

## 📋 Descripción General
- **Nombre del Proyecto**: `helpless-houston` (reuscons4.0)
- **Framework**: Astro 5.15.4 con integración de React
- **Lenguaje**: JavaScript/JSX con TypeScript
- **Estado**: En desarrollo (fase de refactoring y optimización)
- **Rama**: data

## 🏗️ Estructura del Proyecto

```
/
├── public/                              # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── Kanban/
│   │   │   └── Kanban.jsx              # Componente principal del Kanban (estilos inline)
│   │   ├── FileManager/
│   │   │   └── FileManager.jsx         # Gestor de archivos (estilos inline)
│   │   ├── DashboardAdminContent.jsx   # Contenido del dashboard admin
│   │   ├── Modals/                     # ✨ NUEVO - Modals para operaciones CRUD
│   │   │   ├── Tareas/
│   │   │   │   ├── AddTareaModal.jsx   # Crear tareas
│   │   │   │   └── EditTareaModal.jsx  # Editar/eliminar tareas
│   │   │   ├── Obras/
│   │   │   │   └── AddObraModal.jsx    # Crear obras
│   │   │   ├── Archivos/
│   │   │   │   └── UploadArchivoModal.jsx # Subir archivos
│   │   │   ├── Kanbans/
│   │   │   │   └── AddKanbanModal.jsx  # Crear kanbans
│   │   │   ├── Kanban/
│   │   │   │   ├── AsignarKanbanModal.jsx
│   │   │   │   ├── CrearKanbanModal.jsx
│   │   │   │   └── ModificarKanbanModal.jsx
│   │   │   ├── Usuario/
│   │   │   │   ├── CambiarContrasenaModal.jsx
│   │   │   │   ├── CrearUsuarioModal.jsx
│   │   │   │   └── ModificarUsuarioModal.jsx
│   │   │   ├── Otros/
│   │   │   │   ├── ConfiguracionGeneralModal.jsx
│   │   │   │   ├── NotificacionesModal.jsx
│   │   │   │   └── ReportesModal.jsx
│   │   │   └── index.js                # Barrel export para Modals
│   │   ├── UI/
│   │   │   ├── TaskCard/
│   │   │   │   └── TaskCard.jsx        # Componente de tarjeta de tarea
│   │   │   ├── ColumnHeader/
│   │   │   │   └── ColumnHeader.jsx    # Encabezado de columna
│   │   │   ├── AddTaskModal/
│   │   │   │   └── AddTaskModal.jsx    # Modal para agregar tareas (legacy)
│   │   │   ├── TaskEditModal/
│   │   │   │   └── TaskEditModal.jsx   # Modal para editar/eliminar tareas (legacy)
│   │   │   └── index.js                # Barrel export para componentes UI
│   ├── hooks/                          # ✨ ACTUALIZADO/NUEVO - Hooks para APIs
│   │   ├── useTasks.js                 # Hook para tareas (ahora usa API)
│   │   ├── useObras.js                 # Hook para obras
│   │   ├── useArchivos.js              # Hook para archivos
│   │   ├── useKanbans.js               # Hook para kanbans
│   │   └── index.js                    # Barrel export para Hooks
│   ├── lib/
│   │   ├── mongodb.js                  # ✨ NUEVO - Conexión a MongoDB con Mongoose
│   │   └── schemas/                    # ✨ NUEVO - Schemas de Mongoose
│   │       ├── kanban.js               # Schema de Kanban
│   │       ├── tareas.js               # Schema de Tareas
│   │       ├── archivos.js             # Schema de Archivos
│   │       ├── obras.js                # Schema de Obras
│   │       ├── users.js                # Schema de Usuarios
│   │       └── index.js                # Barrel export
│   ├── schemas/
│   │   └── schemas.js                  # Esquemas de validación con Zod
│   ├── data/                           # ✨ NUEVO - Archivos JSON para seed
│   │   ├── kanban.json
│   │   ├── tasks.json
│   │   ├── archivos.json
│   │   ├── obras.json
│   │   └── users.json
│   ├── styles/
│   │   └── global.css                  # Variables CSS globales y reset
│   ├── pages/
│   │   ├── api/                        # ✨ ACTUALIZADO - Endpoints REST con MongoDB
│   │   │   ├── tareas/                 # 7 endpoints (GET, POST, [id], search, stats)
│   │   │   ├── archivos/               # 8 endpoints (GET, POST, [id], search, task, kanban, user)
│   │   │   ├── obras/                  # 5 endpoints (GET, POST, [id], search, status, user)
│   │   │   └── kanbans/                # 4 endpoints (GET, POST, [id], [id]/columns)
│   │   ├── index.astro                 # Redirige a /Login
│   │   ├── Login/
│   │   │   └── index.astro             # Página de login (autenticación cliente)
│   │   ├── Dashboard/
│   │   │   └── index.astro             # Dashboard para usuarios regulares
│   │   ├── DashboardAdmin/
│   │   │   └── index.astro             # Dashboard para administradores
│   │   ├── Kanban/
│   │   │   └── index.astro             # Página del Kanban
│   │   └── Archivos/
│   │       └── index.astro             # Página del gestor de archivos
├── seed.js                             # ✨ NUEVO - Script para importar datos a MongoDB
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                           # Este archivo
├── HOOKS_REFERENCE.md                  # ✨ NUEVO - Documentación de hooks
└── README.md
```

## 📦 Dependencias Principales
- **astro**: ^5.15.4
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **@astrojs/react**: ^4.4.2
- **@atlaskit/pragmatic-drag-and-drop**: ^1.7.7 (drag & drop avanzado)
- **zod**: ^3.25.76 (validación de esquemas)
- **mongoose**: ^8.0.0 (ODM para MongoDB)

## 🚀 Comandos Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo en localhost:4321
npm run build    # Build para producción en ./dist/
npm run preview  # Vista previa del build
npm run astro    # Acceso a comandos CLI de Astro
npm run seed     # Importa datos de JSON a MongoDB
```

## 🎯 Componentes Principales

### 1. **Kanban** ✨ REFACTORIZADO
- Ubicación: `src/components/Kanban/Kanban.jsx`
- Componente React cargado en el cliente (`client:load`)
- **Cambio reciente**: Estilos integrados directamente en el componente (template string)
- Funcionalidad: Gestión de tareas en columnas tipo Kanban
- Utiliza: `TaskCard`, `ColumnHeader`, `AddTaskModal`, `TaskEditModal`, `useTasks` hook
- Características:
  - Drag and drop nativo HTML5 con indicador visual
  - Modales para agregar y editar tareas
  - 6 columnas personalizadas (iPropietari, iConstructora, iElectricista, iLampista, Fuster, Finestres)
  - Persistencia con localStorage

### 2. **FileManager** ✨ REFACTORIZADO
- Ubicación: `src/components/FileManager/FileManager.jsx`
- Componente React para subir, descargar y eliminar archivos
- **Cambio reciente**: Estilos integrados directamente en el componente
- Funcionalidades:
  - Upload de múltiples archivos
  - Lectura en ArrayBuffer
  - Descarga de archivos
  - Eliminación de archivos
  - Información: nombre, tamaño, tipo, fecha de subida

### 3. **Componentes UI (Reutilizables)**
Ubicación: `src/components/UI/`

#### TaskCard
- Componente reutilizable para mostrar tarjetas de tareas
- Implementa drag & drop nativo
- Abre modal al hacer doble-click para editar/eliminar
- Muestra 3 puntitos (⋯) al pasar el mouse que indican que se puede abrir el modal
- Props: `task`, `columnKey`, `columnColor`, `onDragStart`, `onDoubleClick`

#### ColumnHeader
- Encabezado de columna con título y contador de tareas
- Estilos inline
- Props: `title`, `count`, `color`

#### AddTaskModal
- Modal para agregar nuevas tareas
- Selector de columna y validación de entrada
- Manejo de eventos de teclado (Enter, Escape)
- Estilos inline

#### TaskEditModal
- Modal para editar y eliminar tareas
- Abre al hacer doble-click en una tarjeta
- Opciones: Guardar cambios, Eliminar tarea, Cancelar
- Confirmación antes de eliminar
- Estilos inline
- Props: `isOpen`, `task`, `columnKey`, `onClose`, `onSave`, `onDelete`

## 🌐 Rutas de la Aplicación
- `/` - Redirige a `/Login`
- `/Login` - Página de autenticación
- `/Dashboard` - Dashboard para usuarios regulares
- `/DashboardAdmin` - Dashboard para administradores (solo si login es admin/admin)
- `/Kanban` - Gestor de tareas Kanban
- `/Archivos` - Gestor de archivos

## 🎨 Configuración de Estilos
- Astro integrado con React
- **Cambio reciente**: Estilos inline en componentes (no hay archivos CSS separados para componentes principales)
- Variables CSS globales en `src/styles/global.css`
- Tipografía: System fonts predeterminadas
- Box-sizing: border-box en todos los elementos
- Colores, sombras, bordes y transiciones centralizadas en variables CSS

## 🔐 Autenticación y Seguridad
- **Tipo**: Autenticación cliente (sin backend)
- **Credenciales de prueba**:
  - Admin: usuario `admin`, contraseña `admin` → redirige a `/DashboardAdmin`
  - Usuario regular: cualquier otra combinación → redirige a `/Dashboard`
- **Ubicación**: `src/pages/Login/index.astro`
- **Características**:
  - Validación de campos requeridos
  - Redirección condicional según credenciales
  - Interfaz en español

## 📝 Notas Técnicas
- Uso de `client:load` en Astro para componentes React interactivos
- Gestión de estado con `useState` de React
- Identificadores únicos basados en `Date.now().toString()`
- Manejo de archivos con FileReader API
- Validación de datos con Zod (en `src/schemas/schemas.js`)
- Persistencia con localStorage (con validación SSR: `typeof window === 'undefined'`)
- Interfaz completamente en español
- Drag and drop implementado con API nativa HTML5 (dataTransfer)

## 🔗 Hooks Personalizados - APIs MongoDB
- **useTasks**: Hook para gestionar tareas del Kanban
  - Ubicación: `src/hooks/useTasks.js`
  - Funcionalidades: agregar, eliminar, actualizar, mover, reordenar tareas
  - Llamadas a `/api/tareas` - Sincroniza con MongoDB
  - Estados: loading, error, refresh automático

- **useObras**: Hook para gestionar obras
  - Ubicación: `src/hooks/useObras.js`
  - CRUD completo + búsqueda por usuario/status
  - Llamadas a `/api/obras`

- **useArchivos**: Hook para gestionar archivos
  - Ubicación: `src/hooks/useArchivos.js`
  - CRUD + búsqueda + filtrado por tarea/kanban/usuario
  - Soporte para upload con FormData

- **useKanbans**: Hook para gestionar kanbans
  - Ubicación: `src/hooks/useKanbans.js`
  - CRUD de kanbans + gestión de columnas (add, update, delete)
  - Llamadas a `/api/kanbans` y `/api/kanbans/[id]/columns`

Documentación completa en [HOOKS_REFERENCE.md](HOOKS_REFERENCE.md)

## 📋 Esquemas de Validación
- **TaskSchema**: Valida tareas individuales (id + title)
- **TasksSchema**: Valida el conjunto de tareas por columnas
- Ubicación: `src/schemas/schemas.js`
- Usando: Librería Zod

## 🔧 Configuración de Astro
- React integrado como framework principal
- TypeScript habilitado
- Módulo de tipo ES

## 📅 Cambios Recientes - Última Sesión

### ✨ Refactoring de Estilos
- **FileManager.jsx**: Movidos todos los estilos de `FileManager.css` a template string inline
- **Kanban.jsx**: Movidos todos los estilos de `Kanban.css` a template string inline
- **Eliminar archivos CSS innecesarios**: Borrados `FileManager.css` y `Kanban.css`

### 🐛 Correcciones de Errores
- **FileManager.jsx**: Arreglada estructura JSX incompleta (faltaban closing tags)
- **Kanban.jsx**: Corregido enlace a `/archivos` → `/Archivos` (case-sensitive en Astro)
- **PostCSS imports**: Corregidas importaciones de `global.css` en archivos Astro:
  - `src/pages/Login/index.astro`: `/styles/global.css` → `../../styles/global.css`
  - `src/pages/Dashboard/index.astro`: `/styles/global.css` → `../../styles/global.css`
  - `src/pages/DashboardAdmin/index.astro`: `/styles/global.css` → `../../styles/global.css`
- **Duplicated global.css**: Eliminada copia de `public/styles/global.css` (mantenida única fuente en `src/styles/global.css`)

### 🧪 Pruebas con Playwright
- Verificados todos los enlaces de la aplicación
- Confirmada navegación completa:
  - `/` → `/Login`
  - Login admin/admin → `/DashboardAdmin`
  - Login otro usuario → `/Dashboard`
  - Navegación entre Kanban ↔ Archivos
  - Cerrar sesión → `/Login`

### 📊 Estado del Proyecto
- **Componentes CSS**: ✅ Completamente refactorizados a inline
- **Enlaces**: ✅ Todos funcionando correctamente
- **Errores de compilación**: ✅ Resueltos
- **Autenticación**: ✅ Implementada (cliente)
- **Persistencia**: ✅ localStorage con validación SSR

## 🚀 Arquitectura Backend - API Endpoints

### Decisión: API Endpoints (REST)
Se ha decidido usar **API Endpoints** sobre Astro Actions por las siguientes razones:
- Mayor familiaridad del equipo con REST APIs
- Máximo control y flexibilidad en las operaciones
- Mejor soporte para casos de uso complejos
- Facilita integración futura con clientes externos
- Más documentación y comunidad disponible

### Estructura de API Endpoints
```
src/
├── pages/
│   ├── api/
│   │   ├── usuarios/
│   │   │   ├── [id].ts              # GET, PUT, DELETE usuario por ID
│   │   │   └── index.ts             # GET list, POST crear usuario
│   │   ├── kanbans/
│   │   │   ├── [id].ts              # GET, PUT, DELETE kanban por ID
│   │   │   └── index.ts             # GET list, POST crear kanban
│   │   ├── archivos/
│   │   │   ├── [id].ts              # GET, DELETE archivo por ID
│   │   │   └── index.ts             # POST upload archivo
│   │   └── auth/
│   │       └── login.ts             # POST autenticación
```

### Configuración de Base de Datos
- **Base de Datos**: MongoDB
- **ODM**: Mongoose
- **Validación**: Zod (en endpoints)
- **Variable de entorno**: `MONGODB_URI` (debe definirse en `.env`)

### Patrón de Endpoints
Cada endpoint sigue este patrón:
1. Validación de entrada con Zod
2. Llamada a base de datos via Mongoose
3. Manejo de errores
4. Respuesta JSON con status HTTP apropriado

**Status Codes a usar:**
- `200`: OK - Operación exitosa
- `201`: Created - Recurso creado
- `400`: Bad Request - Validación fallida
- `401`: Unauthorized - No autenticado
- `403`: Forbidden - No autorizado
- `404`: Not Found - Recurso no existe
- `500`: Internal Server Error - Error del servidor

### Endpoints de Usuarios Implementados

#### 1. **GET /api/usuarios** - Listar usuarios
- Paginación: parámetros `page` y `limit`
- Filtrado por rol: parámetro `role`
- Respuesta con metadatos de paginación
- Ubicación: `src/pages/api/usuarios/index.js`

#### 2. **POST /api/usuarios** - Crear usuario
- Validación de campos: username, email, password, firstName, lastName
- Campos opcionales: role, company, location, website, telefono
- Verificación de duplicados (username, email)
- Retorna usuario creado (sin password)
- Ubicación: `src/pages/api/usuarios/index.js`

#### 3. **GET /api/usuarios/[id]** - Obtener usuario por ID
- Retorna datos completos del usuario
- Elimina campo password de la respuesta
- Ubicación: `src/pages/api/usuarios/[id].js`

#### 4. **PUT /api/usuarios/[id]** - Actualizar usuario
- Actualización parcial (campos opcionales)
- Validación de duplicados al cambiar username/email
- Mantiene valores existentes si no se proporcionan nuevos
- Ubicación: `src/pages/api/usuarios/[id].js`

#### 5. **DELETE /api/usuarios/[id]** - Eliminar usuario
- Elimina usuario del sistema
- Retorna datos del usuario eliminado
- Ubicación: `src/pages/api/usuarios/[id].js`

#### 6. **PUT /api/usuarios/[id]/password** - Cambiar contraseña
- Validación de contraseña actual
- Validación de nueva contraseña (mínimo 6 caracteres)
- Confirmación de contraseña
- Retorna 401 si contraseña actual es incorrecta
- Ubicación: `src/pages/api/usuarios/[id]/password.js`

#### 7. **GET /api/usuarios/search** - Buscar usuarios
- Búsqueda por parámetro `q` (query)
- Búsqueda por tipo: `username`, `email`, `name` o todos los campos
- Búsqueda insensible a mayúsculas
- Retorna total de resultados encontrados
- Ubicación: `src/pages/api/usuarios/search.js`

#### 8. **GET /api/usuarios/stats** - Estadísticas de usuarios
- Total de usuarios por rol (admin, moderator, user)
- Usuarios nuevos este mes
- Usuario con último acceso más reciente
- Desglose por rol
- Ubicación: `src/pages/api/usuarios/stats.js`

### Estructura de Carpetas - API Usuarios

```
src/pages/api/usuarios/
├── index.js                 # GET (listar) y POST (crear)
├── [id].js                  # GET, PUT, DELETE usuario por ID
├── [id]/
│   └── password.js          # PUT cambiar contraseña
├── search.js                # GET buscar usuarios
└── stats.js                 # GET estadísticas
```

### Patrones Utilizados

**Validación con Zod:**
- Todos los endpoints validan entrada con esquemas Zod
- Mensajes de error descriptivos
- Validación de tipos y restricciones

**Seguridad:**
- Eliminación automática del campo `password` en respuestas
- Verificación de duplicados (username, email)
- Validación de credenciales en cambio de contraseña
- Manejo de errores con status HTTP apropriados

**Formato de Respuesta:**
```json
{
  "success": true/false,
  "message": "Descripción",
  "data": {},
  "error": "Nombre del error (si aplica)",
  "details": [] // Errores de validación (si aplica)
}
```

**Mock Data:**
- Datos de prueba duplicados en cada endpoint
- En producción, reemplazar con llamadas a MongoDB via Mongoose
- IDs generados con `Date.now().toString()`

## 📅 Cambios Recientes - Sesión Actual

### ✨ Integración con MongoDB y Mongoose
- **Conexión a MongoDB**: Creado `src/lib/mongodb.js` con soporte para caching de conexión
- **Schemas de Mongoose**: 5 schemas separados en `src/lib/schemas/` (Kanban, Tareas, Archivos, Obras, Users)
- **Script Seed**: Creado `seed.js` para importar datos JSON a MongoDB automáticamente
- **Base de datos**: `reuscons` en MongoDB local

### ✨ API Endpoints - Refactorización a MongoDB
Todos los endpoints actualizados para usar Mongoose en lugar de mock data:
- **Tareas**: 7 endpoints (GET list, POST create, GET by ID, PUT, DELETE, GET search, GET stats)
- **Archivos**: 8 endpoints (GET list, POST upload, GET by ID, PUT, DELETE, GET search, GET by task, GET by kanban, GET by user)
- **Obras**: 5 endpoints (GET list, POST create, GET by ID, PUT, DELETE, GET search, GET by status, GET by user)
- **Kanbans**: 4 endpoints (GET list, POST create, GET by ID, PUT, DELETE, GET columns, POST/PUT/DELETE column)

Características comunes:
- Validación con Zod en todos los endpoints
- Validación de ObjectIds para Mongoose
- Manejo robusto de errores
- Respuestas estandarizadas con metadatos
- Paginación en endpoints de listado

### ✨ Modals - Interfaz de usuario funcional
Creados 5 modals principales en `src/components/Modals/`:
1. **AddTareaModal**: Crear tareas con validación de caracteres
2. **EditTareaModal**: Editar y eliminar tareas existentes
3. **AddObraModal**: Crear obras con gestión de equipo y admin
4. **UploadArchivoModal**: Subir archivos con drag & drop
5. **AddKanbanModal**: Crear kanbans con editor de columnas visual

Características:
- Llamadas reales a los endpoints de API
- Validación de datos en el cliente
- Manejo de errores con mensajes claros
- Estados de carga durante operaciones
- UI responsivo y accesible

### ✨ Hooks personalizados - Gestión de datos
Creados 4 hooks en `src/hooks/`:
1. **useTasks**: Gestión de tareas (crear, leer, actualizar, eliminar, filtrar por columna/prioridad)
2. **useObras**: Gestión de obras (CRUD + búsqueda por usuario/status)
3. **useArchivos**: Gestión de archivos (CRUD + búsqueda + filtrado)
4. **useKanbans**: Gestión de kanbans (CRUD + gestión de columnas)

Características:
- Conexión automática a APIs
- Estados de carga y error
- Funciones useCallback para optimización
- Métodos de filtrado y búsqueda
- Sincronización en tiempo real con MongoDB

### 📊 Estado del Proyecto - POST MongoDB Integration
- **MongoDB**: ✅ Conectado y funcional
- **Mongoose Schemas**: ✅ 5 schemas completos
- **Seed Script**: ✅ Importa datos correctamente
- **API Endpoints**: ✅ 24 endpoints funcionales con MongoDB
- **Modals**: ✅ 5 modals con integración de API
- **Hooks**: ✅ 4 hooks para gestión de datos
- **Documentación**: ✅ HOOKS_REFERENCE.md creado

### 🚀 Instrucciones de Inicialización
```bash
# 1. Instalar dependencias
npm install

# 2. Asegurar que MongoDB está corriendo en localhost:27017
# En Windows: mongod

# 3. Importar datos a la BD 'reuscons'
npm run seed

# 4. Iniciar el servidor de desarrollo
npm run dev

# 5. Navegar a http://localhost:4321
```

### 💾 Datos Disponibles en MongoDB
- **Kanbans**: 1 kanban de prueba con 3 columnas
- **Tareas**: 1 tarea de prueba
- **Archivos**: 1 archivo de prueba
- **Obras**: 1 obra de prueba
- **Usuarios**: 5 usuarios de prueba

## 🔐 Autenticación - Middleware y Login

### Middleware de Autenticación (src/middleware/auth.ts)
- Valida roles de usuario en rutas protegidas
- Rutas protegidas: `/DashboardAdmin` (admin), `/Dashboard` (user), `/Kanban` y `/Archivos` (ambos)
- Redirige a `/Login` si falta autenticación o rol incorrecto
- Usa cookies HTTP-only para mantener sesión

### Login Page (src/pages/Login/index.astro)
**Credenciales de Prueba:**
- Admin: `admin` / `admin` → Redirige a `/DashboardAdmin`
- Usuario: `user` / `user` → Redirige a `/Dashboard`
- Otras combinaciones → Muestra error

**Características:**
- Validación de credentials en servidor (POST form)
- Cookies HTTP-only con 24 horas de expiracion
- Mensajes de error personalizados
- Interfaz responsive y diseño atractivo
- Test credentials mostrados en login para referencia

## 🎯 Próximas Mejoras Potenciales
- Autenticación con JWT/OAuth (reemplazar cookies simples)
- Rate limiting en API endpoints
- Logging y monitoreo
- Validación avanzada con Zod
- Límites de tamaño en archivos
- Edición colaborativa en tiempo real
- Temas oscuro/claro
- Exportación de tareas (PDF, CSV)
- Sistema de notificaciones
- Caché de resultados
- Índices de base de datos optimizados
- Integración con base de datos de usuarios (MongoDB)
