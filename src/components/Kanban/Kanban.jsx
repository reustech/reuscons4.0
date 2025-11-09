import React, { useState } from 'react';
import TaskCard from '../UI/TaskCard';
import ColumnHeader from '../UI/ColumnHeader';
import AddTaskModal from '../UI/AddTaskModal';
import TaskEditModal from '../UI/TaskEditModal';
import { useTasks } from '../../hooks/useTasks';
import './Kanban.css';

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

  const { tasks, addTask, deleteTask, updateTask, moveTask, reorderTask } = useTasks(initialTasks);

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
    <div className="kanban-container">
      <div className="kanban-header">
        <h1 className="kanban-title">Mi Kanban</h1>
        <div className="header-add-task">
          <button
            className="header-btn-add"
            onClick={() => openAddModal('iProp')}
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

      <AddTaskModal
        isOpen={showAddModal}
        columns={columns}
        selectedColumn={selectedColumn}
        modalInput={modalInput}
        onColumnChange={setSelectedColumn}
        onInputChange={setModalInput}
        onAdd={handleAddTaskFromModal}
        onClose={closeAddModal}
      />

      <TaskEditModal
        isOpen={showEditModal}
        task={editingTask}
        columnKey={editingTaskColumn}
        onClose={closeEditModal}
        onSave={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
