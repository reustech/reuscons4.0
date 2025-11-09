import React, { useState, useEffect } from 'react';
import './Kanban.css';

export default function Kanban() {
  const STORAGE_KEY = 'kanban-tasks';

  const initialTasks = {
    iProp: [
      { id: '1', title: 'Tarea 1' },
    ],
    iCons: [
      { id: '2', title: 'Tarea 2' },
    ],
    iElec: [
      { id: '3', title: 'Tarea 3' },
    ],
    iLamp: [
      { id: '4', title: 'Tarea 4' },
    ],
    iFust: [
      { id: '5', title: 'Tarea 5' },
    ],
    iFine: [
      { id: '6', title: 'Tarea 6' },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [headerInput, setHeaderInput] = useState('');
  const [dropIndicator, setDropIndicator] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('iProp');

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
  const startEdit = (task) => {
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

  const handleDragOver = (e, targetColumn) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!draggedTask) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const taskCards = container.querySelectorAll('[data-task-id]');
    let dropIndex = tasks[targetColumn].length;

    for (let i = 0; i < taskCards.length; i++) {
      const cardRect = taskCards[i].getBoundingClientRect();
      const cardTop = cardRect.top - rect.top;
      const cardMiddle = cardTop + cardRect.height / 2;

      if (y < cardMiddle) {
        dropIndex = i;
        break;
      }
    }

    setDropIndicator({ column: targetColumn, index: dropIndex });
  };

  const handleDragLeave = (e) => {
    // Solo limpiar si se sale completamente del contenedor
    if (e.currentTarget === e.target) {
      setDropIndicator(null);
    }
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask) return;

    const { taskId, sourceColumn } = draggedTask;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;

    let dropIndex = tasks[targetColumn].length;

    // Calcular el índice de drop
    if (sourceColumn === targetColumn) {
      const taskCards = container.querySelectorAll('[data-task-id]');
      for (let i = 0; i < taskCards.length; i++) {
        const cardRect = taskCards[i].getBoundingClientRect();
        const cardTop = cardRect.top - rect.top;
        const cardMiddle = cardTop + cardRect.height / 2;

        if (y < cardMiddle) {
          dropIndex = i;
          break;
        }
      }
    }

    setTasks(prev => {
      const newTasks = { ...prev };
      const task = newTasks[sourceColumn].find(t => t.id === taskId);

      if (!task) return prev;

      // Si es la misma columna, reordenar
      if (sourceColumn === targetColumn) {
        const column = [...newTasks[sourceColumn]];
        const currentIndex = column.findIndex(t => t.id === taskId);

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
        return newTasks;
      }

      // Si es diferente columna, mover
      newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== taskId);
      newTasks[targetColumn] = [...newTasks[targetColumn], task];

      return newTasks;
    });

    setDraggedTask(null);
    setDropIndicator(null);
  };

  const columns = [
    { key: 'iProp', title: 'Propietari', color: '#3b82f6' },
    { key: 'iCons', title: 'Constructora', color: '#f59e0b' },
    { key: 'iElec', title: 'Electricista', color: '#10b981' },
    { key: 'iLamp', title: 'Lampista', color: '#3b82f6' },
    { key: 'iFust', title: 'Fuster', color: '#f59e0b' },
    { key: 'iFine', title: 'Finestres', color: '#10b981' },
  ];

  const handleAddTaskFromHeader = () => {
    if (!headerInput.trim()) return;
    addTask('iProp', headerInput);
    setHeaderInput('');
  };

  const openModal = (columnKey) => {
    setSelectedColumn(columnKey);
    setModalInput('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalInput('');
  };

  const handleAddTaskFromModal = () => {
    if (!modalInput.trim()) return;
    addTask(selectedColumn, modalInput);
    closeModal();
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
            onClick={() => openModal('iProp')}
          >
            + Agregar
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
            data-column-key={column.key}
          >
            <div className="column-header" style={{ borderColor: column.color }}>
              <h2 className="column-title">{column.title}</h2>
              <span className="task-count">{tasks[column.key].length}</span>
            </div>

            <div
              className="tasks-container"
              data-column-key={column.key}
              onDragOver={(e) => handleDragOver(e, column.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              {tasks[column.key].map((task, index) => (
                <>
                  {dropIndicator?.column === column.key && dropIndicator?.index === index && (
                    <div className="drop-indicator" />
                  )}
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
                      className="task-card"
                      draggable
                      data-task-id={task.id}
                      onDragStart={(e) => handleDragStart(e, task.id, column.key)}
                      style={{ borderLeftColor: column.color }}
                    >
                      <div className="task-content">
                        <span className="task-text">{task.title}</span>
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-edit"
                          onClick={() => startEdit(task)}
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
                </>
              ))}
              {dropIndicator?.column === column.key && dropIndicator?.index === tasks[column.key].length && (
                <div className="drop-indicator" />
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Agregar Nueva Tarea</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <label htmlFor="modal-column">Columna:</label>
              <select
                id="modal-column"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="modal-select"
              >
                {columns.map(column => (
                  <option key={column.key} value={column.key}>
                    {column.title}
                  </option>
                ))}
              </select>

              <label htmlFor="modal-input">Tarea:</label>
              <input
                id="modal-input"
                type="text"
                placeholder="Escribe la tarea..."
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTaskFromModal();
                  } else if (e.key === 'Escape') {
                    closeModal();
                  }
                }}
                className="modal-input"
                autoFocus
              />

              <button className="modal-btn-file">
                📎 Añadir Archivo
              </button>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button className="modal-btn-add" onClick={handleAddTaskFromModal}>
                Agregar Tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
