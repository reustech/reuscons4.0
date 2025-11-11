import React, { useState } from 'react';
import { TaskCard, ColumnHeader } from '../UI';

const styles = `
  .kanban-container {
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .kanban-header {
    width: 100%;
    margin: 0 0 2rem 0;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .kanban-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .kanban-back-arrow {
    color: white;
    font-size: 2rem;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .kanban-back-arrow:hover {
    transform: translateX(-4px);
  }

  .kanban-title {
    color: white;
    font-size: 2.5rem;
    margin: 0;
    text-align: left;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .header-add-task {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .header-input {
    flex: 1;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .header-input:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  .header-btn-add {
    background: white;
    color: #667eea;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .header-btn-add:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .header-btn-add:active {
    transform: translateY(0);
  }

  .header-btn-files {
    background: white;
    color: #667eea;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-btn-files:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .header-btn-files:active {
    transform: translateY(0);
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
    width: 100%;
    margin: 0;
  }

  .kanban-column {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    min-height: 500px;
  }

  .kanban-column:hover {
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }

  .column-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    border-bottom: 3px solid;
    background: linear-gradient(to right, #f8f9fa, #ffffff);
  }

  .column-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }

  .task-count {
    background: #e5e7eb;
    color: #374151;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .tasks-container {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: background-color 0.2s ease;
  }

  .tasks-container.drag-over-column {
    background-color: rgba(59, 130, 246, 0.05);
    border-radius: 8px;
  }

  .drop-indicator {
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    border-radius: 2px;
    margin: 4px 0;
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }

  .btn-edit,
  .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    transition: transform 0.2s ease;
  }

  .btn-edit:hover,
  .btn-delete:hover {
    transform: scale(1.2);
  }

  .task-edit {
    background: white;
    border: 1px solid #e5e7eb;
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    padding: 0.75rem;
    display: flex;
    gap: 0.5rem;
  }

  .task-edit input {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.95rem;
    font-family: inherit;
  }

  .task-edit input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .edit-buttons {
    display: flex;
    gap: 0.25rem;
  }

  .btn-save,
  .btn-cancel {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s ease;
  }

  .btn-save:hover {
    background: #2563eb;
  }

  .btn-cancel {
    background: #ef4444;
  }

  .btn-cancel:hover {
    background: #dc2626;
  }

  /* Scroll personalizado */
  .tasks-container::-webkit-scrollbar {
    width: 6px;
  }

  .tasks-container::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 10px;
  }

  .tasks-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  .tasks-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    animation: slideIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s ease;
  }

  .modal-close:hover {
    color: #1f2937;
  }

  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-body label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #374151;
  }

  .modal-select,
  .modal-input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .modal-select:focus,
  .modal-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .modal-footer {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
    justify-content: space-between;
    align-items: center;
  }

  .modal-footer-right {
    display: flex;
    gap: 1rem;
  }

  .modal-btn-cancel,
  .modal-btn-add,
  .modal-btn-delete {
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .modal-btn-cancel {
    background: #e5e7eb;
    color: #374151;
  }

  .modal-btn-cancel:hover {
    background: #d1d5db;
  }

  .modal-btn-add {
    background: #3b82f6;
    color: white;
  }

  .modal-btn-add:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .modal-btn-delete {
    background: #ef4444;
    color: white;
  }

  .modal-btn-delete:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .modal-btn-file {
    background: #f3f4f6;
    color: #374151;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .modal-btn-file:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
    color: #1f2937;
  }

  .modal-btn-file:active {
    transform: scale(0.98);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .kanban-container {
      padding: 1rem;
    }

    .kanban-header {
      margin-bottom: 1.5rem;
    }

    .kanban-title {
      font-size: 1.75rem;
    }

    .header-add-task {
      max-width: 100%;
      flex-direction: column;
    }

    .header-input,
    .header-btn-add,
    .header-btn-files {
      width: 100%;
    }

    .kanban-board {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .kanban-column {
      min-height: 400px;
    }
  }
`;

export default function Kanban() {
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
  const [dropIndicator, setDropIndicator] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('iProp');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskColumn, setEditingTaskColumn] = useState(null);

  const columns = [
    { key: 'iProp', title: 'iPropietari', color: '#3b82f6' },
    { key: 'iCons', title: 'iConstructora', color: '#f59e0b' },
    { key: 'iElec', title: 'iElectricista', color: '#10b981' },
    { key: 'iLamp', title: 'iLampista', color: '#3b82f6' },
    { key: 'iFust', title: 'Fuster', color: '#f59e0b' },
    { key: 'iFine', title: 'Finestres', color: '#10b981' },
  ];

  // Funciones de Modal para Agregar Tarea
  const openAddModal = (columnKey = 'iProp') => {
    setSelectedColumn(columnKey);
    setModalInput('');
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setModalInput('');
  };

  const handleAddTaskFromModal = () => {
    if (!modalInput.trim()) return;
    addTask(selectedColumn, modalInput);
    closeAddModal();
  };

  // Funciones de Modal para Editar Tarea
  const openEditModal = (task, columnKey) => {
    setEditingTask(task);
    setEditingTaskColumn(columnKey);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTask(null);
    setEditingTaskColumn(null);
  };

  // Funciones de Drag and Drop
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
      reorderTask(sourceColumn, taskId, dropIndex);
    } else {
      moveTask(sourceColumn, targetColumn, taskId);
    }

    setDraggedTask(null);
    setDropIndicator(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="kanban-container">
      <div className="kanban-header">
        <div className="kanban-title-wrapper">
          <a href="/" className="kanban-back-arrow">←</a>
          <h1 className="kanban-title">Mi Kanban</h1>
        </div>
        <div className="header-add-task">
          <button
            className="header-btn-add"
            onClick={() => openAddModal('iProp')}
          >
            + Agregar
          </button>
          <a href="/Archivos" className="header-btn-files">
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
            <ColumnHeader
              title={column.title}
              count={tasks[column.key].length}
              color={column.color}
            />

            <div
              className="tasks-container"
              data-column-key={column.key}
              onDragOver={(e) => handleDragOver(e, column.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              {tasks[column.key]?.map((task, index) => (
                <React.Fragment key={`task-${task.id}`}>
                  {dropIndicator?.column === column.key && dropIndicator?.index === index && (
                    <div className="drop-indicator" />
                  )}
                  <TaskCard
                    task={task}
                    columnKey={column.key}
                    columnColor={column.color}
                    onDragStart={handleDragStart}
                    onDoubleClick={openEditModal}
                  />
                </React.Fragment>
              )) || []}
              {dropIndicator?.column === column.key && dropIndicator?.index === tasks[column.key]?.length && (
                <div className="drop-indicator" />
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
