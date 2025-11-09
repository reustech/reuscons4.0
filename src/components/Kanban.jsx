import React, { useState, useEffect } from 'react';
import './Kanban.css';

export default function Kanban() {
  const STORAGE_KEY = 'kanban-tasks';

  const initialTasks = {
    todo: [
      { id: '1', title: 'Diseñar la interfaz' },
      { id: '2', title: 'Crear componentes' },
    ],
    inProgress: [
      { id: '3', title: 'Implementar drag and drop' },
    ],
    done: [
      { id: '4', title: 'Instalar dependencias' },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [headerInput, setHeaderInput] = useState('');

  // Cargar datos del localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Error cargando datos:', e);
      }
    }
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Crear nueva tarjeta
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

  // Eliminar tarjeta
  const deleteTask = (columnKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].filter(t => t.id !== taskId),
    }));
  };

  // Editar tarjeta
  const startEdit = (task, columnKey) => {
    setEditingTaskId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = (columnKey, taskId) => {
    if (!editingText.trim()) {
      setEditingTaskId(null);
      setEditingText('');
      return;
    }

    setTasks(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].map(t =>
        t.id === taskId ? { ...t, title: editingText.trim() } : t
      ),
    }));

    setEditingTaskId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleDragStart = (e, taskId, sourceColumn) => {
    setDraggedTask({ taskId, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetColumn, targetIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex({ column: targetColumn, index: targetIndex });
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetColumn, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask) {
      setDragOverIndex(null);
      return;
    }

    const { taskId, sourceColumn } = draggedTask;

    // Encontrar la tarea
    const task = tasks[sourceColumn].find(t => t.id === taskId);
    if (!task) {
      setDraggedTask(null);
      setDragOverIndex(null);
      return;
    }

    setTasks(prev => {
      const newTasks = { ...prev };

      if (sourceColumn === targetColumn) {
        // Reordenar dentro de la misma columna
        const column = [...newTasks[sourceColumn]];
        const currentIndex = column.findIndex(t => t.id === taskId);

        // Si es el mismo índice, no hacer nada
        if (currentIndex === dropIndex) {
          return prev;
        }

        // Remover de la posición actual
        column.splice(currentIndex, 1);

        // Calcular la nueva posición correctamente
        let newIndex = dropIndex;
        if (currentIndex < dropIndex) {
          newIndex = dropIndex - 1;
        }

        // Insertar en la nueva posición
        column.splice(newIndex, 0, task);

        newTasks[sourceColumn] = column;
      } else {
        // Mover a otra columna
        const sourceCol = newTasks[sourceColumn].filter(t => t.id !== taskId);
        const targetCol = [...newTasks[targetColumn]];

        // Insertar en el índice correcto
        const insertIndex = Math.min(dropIndex, targetCol.length);
        targetCol.splice(insertIndex, 0, task);

        newTasks[sourceColumn] = sourceCol;
        newTasks[targetColumn] = targetCol;
      }

      return newTasks;
    });

    setDraggedTask(null);
    setDragOverIndex(null);
  };

  const columns = [
    { key: 'todo', title: 'Por hacer', color: '#3b82f6' },
    { key: 'inProgress', title: 'En progreso', color: '#f59e0b' },
    { key: 'done', title: 'Hecho', color: '#10b981' },
  ];

  const handleAddTaskFromHeader = () => {
    if (!headerInput.trim()) return;
    addTask('todo', headerInput);
    setHeaderInput('');
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h1 className="kanban-title">Mi Kanban</h1>
        <div className="header-add-task">
          <input
            type="text"
            placeholder="Agregar nueva tarea..."
            value={headerInput}
            onChange={(e) => setHeaderInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTaskFromHeader();
              }
            }}
            className="header-input"
          />
          <button
            className="header-btn-add"
            onClick={handleAddTaskFromHeader}
          >
            Agregar
          </button>
          <a href="/archivos" className="header-btn-files">
            📁 Archivos
          </a>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map(column => (
          <div
            key={column.key}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.key)}
          >
            <div className="column-header" style={{ borderColor: column.color }}>
              <h2 className="column-title">{column.title}</h2>
              <span className="task-count">{tasks[column.key].length}</span>
            </div>

            <div
              className="tasks-container"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // Calcular el índice basado en la posición Y
                const container = e.currentTarget;
                const rect = container.getBoundingClientRect();
                const y = e.clientY - rect.top;

                const taskCards = container.querySelectorAll('.task-card');
                let dropIndex = tasks[column.key].length;

                for (let i = 0; i < taskCards.length; i++) {
                  const cardRect = taskCards[i].getBoundingClientRect();
                  const cardTop = cardRect.top - rect.top;
                  const cardMiddle = cardTop + cardRect.height / 2;

                  if (y < cardMiddle) {
                    dropIndex = i;
                    break;
                  }
                }

                handleDrop(e, column.key, dropIndex);
              }}
            >
              {tasks[column.key].map((task, index) => (
                <div key={task.id}>
                  {editingTaskId === task.id ? (
                    <div className="task-edit">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit(column.key, task.id);
                          } else if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                      />
                      <div className="edit-buttons">
                        <button
                          className="btn-save"
                          onClick={() => saveEdit(column.key, task.id)}
                        >
                          ✓
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={cancelEdit}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`task-card ${dragOverIndex?.column === column.key && dragOverIndex?.index === index ? 'drag-over' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id, column.key)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDragOver(e, column.key, index);
                      }}
                      onDragLeave={handleDragLeave}
                      style={{ borderLeftColor: column.color }}
                    >
                      <div className="task-content">
                        <span className="task-text">{task.title}</span>
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-edit"
                          onClick={() => startEdit(task, column.key)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteTask(column.key, task.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
