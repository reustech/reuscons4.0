import { useState, useEffect } from 'react';
import { validateTasks } from './schemas';

const STORAGE_KEY = 'kanban-tasks';

// Helper function to safely access localStorage
const getFromStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved;
  } catch (e) {
    console.error('Error leyendo localStorage:', e);
    return null;
  }
};

// Helper function to safely save to localStorage
const saveToStorage = (data) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error guardando en localStorage:', e);
  }
};

export function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  // Cargar datos del localStorage en cliente
  useEffect(() => {
    const saved = getFromStorage();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validated = validateTasks(parsed);
        if (validated) {
          setTasks(validated);
        }
      } catch (e) {
        console.error('Error cargando datos:', e);
      }
    }
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);

  const addTask = (columnKey, title) => {
    if (!title.trim()) return;

    const newId = Date.now().toString();
    setTasks(prev => ({
      ...prev,
      [columnKey]: [
        ...prev[columnKey],
        { id: newId, title: title.trim() },
      ],
    }));
  };

  const deleteTask = (columnKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].filter(t => t.id !== taskId),
    }));
  };

  const updateTask = (columnKey, taskId, newTitle) => {
    if (!newTitle.trim()) return;

    setTasks(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].map(t =>
        t.id === taskId ? { ...t, title: newTitle.trim() } : t
      ),
    }));
  };

  const moveTask = (sourceColumn, targetColumn, taskId) => {
    if (sourceColumn === targetColumn) return;

    setTasks(prev => {
      const newTasks = { ...prev };
      const task = newTasks[sourceColumn].find(t => t.id === taskId);

      if (!task) return prev;

      newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== taskId);
      newTasks[targetColumn] = [...newTasks[targetColumn], task];

      return newTasks;
    });
  };

  const reorderTask = (columnKey, taskId, newIndex) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      const column = [...newTasks[columnKey]];
      const task = column.find(t => t.id === taskId);

      if (!task) return prev;

      const currentIndex = column.findIndex(t => t.id === taskId);

      if (currentIndex === newIndex) return prev;

      column.splice(currentIndex, 1);

      let insertIndex = newIndex;
      if (currentIndex < newIndex) {
        insertIndex = newIndex - 1;
      }

      column.splice(insertIndex, 0, task);
      newTasks[columnKey] = column;

      return newTasks;
    });
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    moveTask,
    reorderTask,
  };
}
