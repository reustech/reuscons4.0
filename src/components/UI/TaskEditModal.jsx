import React, { useState } from 'react';

export default function TaskEditModal({
  isOpen,
  task,
  columnKey,
  onClose,
  onSave,
  onDelete,
}) {
  const [editingText, setEditingText] = useState(task?.title || '');

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (editingText.trim()) {
      onSave(columnKey, task.id, editingText);
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      onDelete(columnKey, task.id);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Tarea</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label htmlFor="task-input">Tarea:</label>
          <input
            id="task-input"
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="modal-input"
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button className="modal-btn-delete" onClick={handleDelete}>
            Eliminar
          </button>
          <div className="modal-footer-right">
            <button className="modal-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="modal-btn-add" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
