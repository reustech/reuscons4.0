# Contexto del Proyecto - Reuscons 4.0

## 📋 Descripción General
- **Nombre del Proyecto**: `helpless-houston` (reuscons4.0)
- **Framework**: Astro 5.15.4 con integración de React
- **Lenguaje**: JavaScript/JSX con TypeScript
- **Estado**: En desarrollo
- **Rama**: testAltasian

## 🏗️ Estructura del Proyecto

```
/
├── public/                              # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── Kanban/
│   │   │   ├── Kanban.jsx              # Componente principal del Kanban
│   │   │   └── Kanban.css              # Estilos del Kanban + Modales
│   │   ├── FileManager/
│   │   │   ├── FileManager.jsx         # Gestor de archivos
│   │   │   └── FileManager.css         # Estilos del gestor
│   │   └── UI/
│   │       ├── TaskCard.jsx            # Componente de tarjeta de tarea
│   │       ├── ColumnHeader.jsx        # Encabezado de columna
│   │       ├── AddTaskModal.jsx        # Modal para agregar tareas
│   │       └── TaskEditModal.jsx       # Modal para editar/eliminar tareas (NUEVO)
│   ├── hooks/
│   │   └── useTasks.js                 # Hook para gestión de tareas
│   ├── schemas/
│   │   └── schemas.js                  # Esquemas de validación con Zod
│   └── pages/
│       ├── index.astro                 # Página principal (Kanban)
│       └── archivos.astro              # Página de gestión de archivos
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── claude.md                           # Este archivo
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

### 1. **Kanban**
- Ubicación: `src/components/Kanban/`
- Componente React cargado en el cliente (`client:load`)
- Funcionalidad: Gestión de tareas en columnas tipo Kanban
- Utiliza: `TaskCard`, `ColumnHeader`, `AddTaskModal`, `useTasks` hook
- Estilos: `Kanban.css` (incluye estilos para el modal)

### 2. **FileManager**
- Ubicación: `src/components/FileManager/`
- Componente React para subir, descargar y eliminar archivos
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
- Implementa drag & drop
- Abre modal al hacer doble-click para editar/eliminar
- Muestra 3 puntitos (⋯) al pasar el mouse que indican que se puede abrir el modal
- Props: `task`, `columnKey`, `columnColor`, `onDragStart`, `onDoubleClick`

#### ColumnHeader
- Encabezado de columna con título y contador de tareas
- Props: `title`, `count`, `color`

#### AddTaskModal
- Modal para agregar nuevas tareas
- Selector de columna y validación de entrada
- Manejo de eventos de teclado (Enter, Escape)

#### TaskEditModal (NUEVO)
- Modal para editar y eliminar tareas
- Abre al hacer doble-click en una tarjeta
- Opciones: Guardar cambios, Eliminar tarea, Cancelar
- Confirmación antes de eliminar
- Props: `isOpen`, `task`, `columnKey`, `onClose`, `onSave`, `onDelete`

## 🌐 Rutas de la Aplicación
- `/` - Página principal (Kanban)
- `/archivos` - Gestor de archivos

## 🎨 Configuración de Estilos
- Astro integrado con React
- CSS modules en componentes
- Estilos globales en `index.astro`
- Tipografía: System fonts predeterminadas
- Box-sizing: border-box en todos los elementos

## 📝 Notas Técnicas
- Uso de `client:load` en Astro para componentes React interactivos
- Gestión de estado con `useState` de React
- Identificadores únicos basados en `Date.now().toString()`
- Manejo de archivos con FileReader API
- Validación de datos con Zod (en `src/schemas/schemas.js`)
- Persistencia con localStorage
- Interfaz en español

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

## 📅 Historial de Commits Recientes
- 86d7fbd: dfgsdfg
- 06fb715: sdfsdf
- 55ff06b: sdfasdf
- 1202feb: asdfasd

## 🎯 Próximas Mejoras Potenciales
- Persistencia de datos (LocalStorage/DB)
- Validación avanzada con Zod
- Límites de tamaño en archivos
- Mejor UI/UX
- Temas oscuro/claro
- Autenticación de usuarios
