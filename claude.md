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
│   │   ├── UI/
│   │   │   ├── TaskCard/
│   │   │   │   └── TaskCard.jsx        # Componente de tarjeta de tarea
│   │   │   ├── ColumnHeader/
│   │   │   │   └── ColumnHeader.jsx    # Encabezado de columna
│   │   │   ├── AddTaskModal/
│   │   │   │   └── AddTaskModal.jsx    # Modal para agregar tareas
│   │   │   ├── TaskEditModal/
│   │   │   │   └── TaskEditModal.jsx   # Modal para editar/eliminar tareas
│   │   │   └── index.js                # Barrel export para componentes UI
│   │   └── useTasks.js                 # Hook para gestión de tareas (en raíz de components)
│   ├── hooks/
│   │   └── useTasks.js                 # Hook para gestión de tareas con localStorage
│   ├── schemas/
│   │   └── schemas.js                  # Esquemas de validación con Zod
│   ├── styles/
│   │   └── global.css                  # Variables CSS globales y reset
│   └── pages/
│       ├── index.astro                 # Redirige a /Login
│       ├── Login/
│       │   └── index.astro             # Página de login (autenticación cliente)
│       ├── Dashboard/
│       │   └── index.astro             # Dashboard para usuarios regulares
│       ├── DashboardAdmin/
│       │   └── index.astro             # Dashboard para administradores
│       ├── Kanban/
│       │   └── index.astro             # Página del Kanban
│       └── Archivos/
│           └── index.astro             # Página del gestor de archivos
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                           # Este archivo
└── README.md
```

## 📦 Dependencias Principales
- **astro**: ^5.15.4
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **@astrojs/react**: ^4.4.2
- **@atlaskit/pragmatic-drag-and-drop**: ^1.7.7 (drag & drop avanzado)
- **zod**: ^3.25.76 (validación de esquemas)

## 🚀 Comandos Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo en localhost:4321
npm run build    # Build para producción en ./dist/
npm run preview  # Vista previa del build
npm run astro    # Acceso a comandos CLI de Astro
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

## 🔗 Hooks Personalizados
- **useTasks**: Hook para gestionar tareas del Kanban
  - Ubicación: `src/hooks/useTasks.js`
  - Funcionalidades: agregar, eliminar, actualizar, mover y reordenar tareas
  - Sincroniza con localStorage automáticamente

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

## 🎯 Próximas Mejoras Potenciales
- Backend de autenticación (JWT, OAuth)
- Base de datos para persistencia de tareas
- Validación avanzada con Zod
- Límites de tamaño en archivos
- Edición colaborativa en tiempo real
- Temas oscuro/claro
- Exportación de tareas (PDF, CSV)
- Sistema de notificaciones
- Panel de administración funcional
