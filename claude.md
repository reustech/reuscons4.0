# Contexto del Proyecto - Reuscons 4.0

## 📋 Descripción General
- **Nombre del Proyecto**: `helpless-houston` (reuscons4.0)
- **Framework**: Astro 5.15.4 con integración de React
- **Lenguaje**: JavaScript/JSX
- **Estado**: En desarrollo (frontend puro, sin backend)
- **Rama**: development

## 🏗️ Estructura del Proyecto

```
/
├── public/                              # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── Composed/                    # Componentes compuestos
│   │   │   ├── DashboardAdmin/
│   │   │   ├── DashboardUser/
│   │   │   ├── Kanban/
│   │   │   │   └── Kanban.jsx          # Componente principal del Kanban
│   │   │   ├── Login/
│   │   │   └── index.js
│   │   ├── Modals/                      # Modals para operaciones CRUD
│   │   │   ├── Column/                  # Modals para columnas Kanban
│   │   │   ├── File/                    # Modals para archivos
│   │   │   ├── Kanban/                  # Modals para kanbans
│   │   │   ├── Task/                    # Modals para tareas
│   │   │   ├── User/                    # Modals para usuarios (ACTUALIZADO - localStorage)
│   │   │   ├── Worksite/                # Modals para obras
│   │   │   └── index.js
│   │   ├── UI/                          # Componentes UI reutilizables
│   │   │   ├── Button/
│   │   │   ├── ErrorMessage/
│   │   │   ├── Input/
│   │   │   ├── Label/
│   │   │   ├── Select/
│   │   │   └── index.js
│   ├── data/                            # Archivos JSON con datos iniciales
│   │   ├── columns.json
│   │   ├── files.json
│   │   ├── kanban.json
│   │   ├── tasks.json
│   │   ├── users.json
│   │   └── worksites.json
│   ├── styles/
│   │   └── global.css                   # Variables CSS globales y reset
│   ├── pages/
│   │   ├── index.astro                  # Redirige a /Login
│   │   ├── Login/
│   │   │   └── index.astro              # Página de login (autenticación cliente)
│   │   ├── Dashboard/
│   │   │   └── index.astro              # Dashboard para usuarios regulares
│   │   ├── DashboardAdmin/
│   │   │   └── index.astro              # Dashboard para administradores
│   │   ├── Kanban/
│   │   │   └── index.astro              # Página del Kanban
│   │   └── Archivos/
│   │       └── index.astro              # Página del gestor de archivos
│   └── layouts/
│       └── Layout.astro
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                            # Este archivo
└── README.md
```

## 📦 Dependencias Principales
- **astro**: ^5.15.4
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **@astrojs/react**: ^4.4.2
- **@atlaskit/pragmatic-drag-and-drop**: ^1.7.7 (drag & drop avanzado)

## 🚀 Comandos Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo en localhost:4321
npm run build    # Build para producción en ./dist/
npm run preview  # Vista previa del build
npm run astro    # Acceso a comandos CLI de Astro
```

## 🎯 Componentes Principales

### 1. **Kanban**
- Ubicación: `src/components/Composed/Kanban/Kanban.jsx`
- Componente React cargado en el cliente (`client:load`)
- Funcionalidad: Gestión de tareas en columnas tipo Kanban
- Características:
  - Drag and drop nativo HTML5 con indicador visual
  - Modales para agregar y editar tareas
  - Columnas configurables
  - Persistencia con localStorage
  - Gestión de estado local con React hooks

### 2. **FileManager**
- Ubicación: `src/components/FileManager/FileManager.jsx`
- Componente React para subir, descargar y eliminar archivos
- Funcionalidades:
  - Upload de múltiples archivos
  - Descarga de archivos
  - Eliminación de archivos
  - Información: nombre, tamaño, tipo, fecha de subida
  - Almacenamiento en localStorage

### 3. **Componentes UI (Reutilizables)**
Ubicación: `src/components/UI/`

- **Button**: Botón estilizado reutilizable
- **ErrorMessage**: Componente para mostrar mensajes de error
- **Input**: Campo de entrada con estilos consistentes
- **Label**: Etiqueta para formularios
- **Select**: Selector HTML personalizado

### 4. **Modales**

#### Modals de Usuario
- **CreateUserModal**: Crear usuarios con localStorage
- **EditUserModal**: Editar usuarios existentes
- **DeleteUserModal**: Eliminar usuarios con confirmación

Características:
- Gestión de estado con localStorage
- Validación de datos en el cliente
- Manejo de errores con mensajes claros
- Interfaz responsiva y accesible

#### Modals de Tareas
- **CreateTaskModal**: Crear nuevas tareas
- **EditTaskModal**: Editar/eliminar tareas existentes

#### Modals de Kanbans
- **CreateColumnModal**: Crear nuevas columnas
- **EditColumnModal**: Editar columnas existentes
- **DeleteColumnModal**: Eliminar columnas

#### Modals de Archivos
- **CreateFileModal**: Crear/subir archivos
- **EditFileModal**: Editar metadatos de archivos
- **DeleteFileModal**: Eliminar archivos

#### Modals de Obras
- Gestión de proyectos/obras con información de equipo

## 🌐 Rutas de la Aplicación
- `/` - Redirige a `/Login`
- `/Login` - Página de autenticación
- `/Dashboard` - Dashboard para usuarios regulares
- `/DashboardAdmin` - Dashboard para administradores
- `/Kanban` - Gestor de tareas Kanban
- `/Archivos` - Gestor de archivos

## 🎨 Configuración de Estilos
- Astro integrado con React
- Estilos inline en componentes React
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
  - Cookies HTTP-only para mantener sesión (24 horas)

## 📝 Notas Técnicas
- Uso de `client:load` en Astro para componentes React interactivos
- Gestión de estado con `useState` y `useCallback` de React
- Identificadores únicos basados en `Date.now().toString()`
- Manejo de archivos con FileReader API
- Persistencia con localStorage (con validación SSR: `typeof window === 'undefined'`)
- Interfaz completamente en español
- Drag and drop implementado con API nativa HTML5 (dataTransfer)
- Datos iniciales almacenados en archivos JSON en `src/data/`

## 📊 Almacenamiento de Datos
- **Ubicación**: localStorage del navegador
- **Datos soportados**:
  - Usuarios (Create, Read, Update, Delete)
  - Tareas (Kanban)
  - Archivos
  - Kanbans y columnas
  - Obras/Proyectos
- **Inicialización**: Los datos JSON en `src/data/` pueden ser importados manualmente o se cargan como fallback

## 🔧 Configuración de Astro
- React integrado como framework principal
- `output: 'static'` para generación de sitio estático
- `client:load` para hidratación de componentes React en el cliente

## 📅 Cambios Recientes - Sesión Actual (Limpieza de Backend)

### ✨ Eliminación de Backend
- **Eliminada carpeta**: `src/pages/api/` (todos los endpoints REST)
- **Eliminada carpeta**: `src/lib/` (conexión a MongoDB y schemas de Mongoose)
- **Eliminado archivo**: `seed.js` (script de importación a BD)
- **Eliminada carpeta**: `src/middleware/` (middleware de autenticación)

### ✨ Actualización de Componentes a localStorage
- **CreateUserModal**: Ahora usa localStorage en lugar de API `/api/usuarios`
- **EditUserModal**: Actualiza usuarios en localStorage
- **DeleteUserModal**: Elimina usuarios de localStorage con confirmación

### 📦 Dependencias Removidas
- `mongoose`: ODM para MongoDB (ya no necesario)
- `zod`: Validación (ya no usada, validación manual en componentes)

### 📊 Estado del Proyecto - Versión Frontend Pura
- **Backend**: ❌ Completamente removido
- **API Endpoints**: ❌ Eliminados
- **MongoDB**: ❌ Ya no requerido
- **Middleware**: ❌ Eliminado
- **Almacenamiento**: ✅ localStorage (frontend)
- **Autenticación**: ✅ Cliente-side con cookies
- **Componentes**: ✅ Todos funcionales con estado local

## 🎯 Próximas Mejoras Potenciales
- Exportación de datos (CSV, JSON)
- Temas oscuro/claro
- Búsqueda y filtrado avanzado
- Historial de cambios
- Sincronización con servidor (cuando se agregue backend)
- Validación de datos mejorada
- Caché de aplicación con Service Workers
- Soporte para múltiples idiomas
