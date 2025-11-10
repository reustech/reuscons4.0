# Hooks Reference Guide

## Importar Hooks

```javascript
import { useTasks, useObras, useArchivos, useKanbans } from '@/hooks';
```

---

## `useTasks(kanbanId, initialTasks?)`

Hook para gestionar tareas de un kanban específico.

### Props
- `kanbanId` (string, requerido): ID del kanban al que pertenecen las tareas
- `initialTasks` (array, opcional): Tareas iniciales

### Retorna
```javascript
{
  tasks,                  // Array de tareas
  loading,               // Boolean - cargando
  error,                 // String - mensaje de error
  addTask,               // Function - crear tarea
  deleteTask,            // Function - eliminar tarea
  updateTask,            // Function - actualizar tarea
  moveTask,              // Function - mover a otra columna
  reorderTask,           // Function - cambiar orden
  updatePriority,        // Function - cambiar prioridad
  getTasksByColumn,      // Function - obtener por columna
  getTasksByPriority,    // Function - obtener por prioridad
  getStats,              // Function - obtener estadísticas
  refresh,               // Function - refrescar datos
  clearError             // Function - limpiar errores
}
```

### Ejemplo de uso
```jsx
import { useTasks } from '@/hooks';

export function MiComponente() {
  const {
    tasks,
    loading,
    error,
    addTask,
    deleteTask,
    updateTask,
    moveTask
  } = useTasks('507f1f77bcf86cd799439020');

  const handleAddTask = async () => {
    const newTask = await addTask('todo', 'Mi nueva tarea', 'Descripción', 'high');
    if (newTask) {
      console.log('Tarea creada:', newTask);
    }
  };

  const handleMoveTask = async () => {
    const updated = await moveTask('taskId123', 'in-progress');
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleAddTask}>Agregar Tarea</button>
      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={() => deleteTask(task._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

---

## `useObras()`

Hook para gestionar obras.

### Retorna
```javascript
{
  obras,                 // Array de obras
  loading,              // Boolean - cargando
  error,                // String - mensaje de error
  addObra,              // Function - crear obra
  getObra,              // Function - obtener por ID
  updateObra,           // Function - actualizar obra
  deleteObra,           // Function - eliminar obra
  searchObras,          // Function - buscar obras
  getObrasByUser,       // Function - obras por usuario
  getObrasByStatus,     // Function - obras por status
  refresh,              // Function - refrescar datos
  clearError            // Function - limpiar errores
}
```

### Ejemplo de uso
```jsx
import { useObras } from '@/hooks';

export function MisObras() {
  const { obras, loading, addObra } = useObras();

  const handleAddObra = async () => {
    const newObra = await addObra({
      name: 'Nueva Obra',
      client: 'Cliente XYZ',
      location: 'Barcelona',
      address: 'Calle Principal 123',
      priority: 'high',
      status: 'planning'
    });
  };

  return (
    <div>
      {obras.map(obra => (
        <div key={obra._id}>{obra.name}</div>
      ))}
    </div>
  );
}
```

---

## `useArchivos()`

Hook para gestionar archivos.

### Retorna
```javascript
{
  archivos,            // Array de archivos
  loading,             // Boolean - cargando
  error,               // String - mensaje de error
  addArchivo,          // Function - subir archivo
  getArchivo,          // Function - obtener por ID
  updateArchivo,       // Function - actualizar archivo
  deleteArchivo,       // Function - eliminar archivo
  searchArchivos,      // Function - buscar archivos
  getArchivosByTask,   // Function - archivos por tarea
  getArchivosByKanban, // Function - archivos por kanban
  getArchivosByUser,   // Function - archivos por usuario
  refresh,             // Function - refrescar datos
  clearError           // Function - limpiar errores
}
```

### Ejemplo de uso
```jsx
import { useArchivos } from '@/hooks';

export function UploadArchivo() {
  const { archivos, addArchivo } = useArchivos();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'Mi archivo');
    formData.append('kanbanId', 'kanban123');

    const newArchivo = await addArchivo(formData);
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
      {archivos.map(archivo => (
        <div key={archivo._id}>{archivo.originalName}</div>
      ))}
    </div>
  );
}
```

---

## `useKanbans()`

Hook para gestionar kanbans y sus columnas.

### Retorna
```javascript
{
  kanbans,            // Array de kanbans
  loading,            // Boolean - cargando
  error,              // String - mensaje de error
  addKanban,          // Function - crear kanban
  getKanban,          // Function - obtener por ID
  updateKanban,       // Function - actualizar kanban
  deleteKanban,       // Function - eliminar kanban
  getColumns,         // Function - obtener columnas
  addColumn,          // Function - agregar columna
  updateColumn,       // Function - actualizar columna
  deleteColumn,       // Function - eliminar columna
  refresh,            // Function - refrescar datos
  clearError          // Function - limpiar errores
}
```

### Ejemplo de uso
```jsx
import { useKanbans } from '@/hooks';

export function MisKanbans() {
  const { kanbans, addKanban, getColumns } = useKanbans();

  const handleAddKanban = async () => {
    const newKanban = await addKanban({
      name: 'Mi Kanban',
      description: 'Descripción',
      columns: [
        { key: 'todo', title: 'Por Hacer', color: '#E8F4F8', order: 1 },
        { key: 'in-progress', title: 'En Progreso', color: '#FFF4E6', order: 2 },
        { key: 'done', title: 'Hecho', color: '#E8F8F0', order: 3 }
      ],
      isPublic: false
    });
  };

  const handleGetColumns = async (kanbanId) => {
    const columns = await getColumns(kanbanId);
  };

  return (
    <div>
      <button onClick={handleAddKanban}>Crear Kanban</button>
      {kanbans.map(kanban => (
        <div key={kanban._id}>{kanban.name}</div>
      ))}
    </div>
  );
}
```

---

## Patrones Comunes

### Manejo de errores
```jsx
const { error, clearError } = useTasks('kanbanId');

useEffect(() => {
  if (error) {
    console.error(error);
    // Limpiar error después de 3 segundos
    const timer = setTimeout(() => clearError(), 3000);
    return () => clearTimeout(timer);
  }
}, [error, clearError]);
```

### Cargar datos específicos
```jsx
const { getTasksByColumn, getTasksByPriority, getStats } = useTasks('kanbanId');

// Obtener tareas por columna
const todoTasks = getTasksByColumn('todo');

// Obtener tareas de alta prioridad
const highPriority = getTasksByPriority('high');

// Obtener estadísticas
const stats = getStats();
// { total: 10, byColumn: { todo: 3, 'in-progress': 5, done: 2 }, byPriority: {...} }
```

### Refrescar datos
```jsx
const { refresh, error } = useTasks('kanbanId');

const handleRefresh = async () => {
  await refresh();
};
```

---

## Notas Importantes

1. **Conexión Automática**: Los hooks se conectan automáticamente a los endpoints de API en el servidor
2. **Estados de Carga**: Siempre verifica `loading` antes de renderizar datos
3. **Manejo de Errores**: Usa `error` para mostrar mensajes al usuario
4. **Rendimiento**: Los hooks usan `useCallback` para optimizar re-renders
5. **MongoDB**: Los datos se almacenan en MongoDB y están siempre sincronizados

---

## Troubleshooting

### Error "Cannot read property '_id' of undefined"
- Asegúrate de que el `kanbanId` es válido
- Verifica que el kanban exista en la BD

### Los datos no se actualizan
- Intenta llamar a `refresh()` para refrescar manualmente
- Verifica que no hay errores en la consola

### El archivo no se sube
- Usa `FormData` para subir archivos
- No incluyas encabezado `Content-Type` (el navegador lo agrega automáticamente)
