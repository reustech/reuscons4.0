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
    <>
      <style>{styles}</style>
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
    </>
  );
}



const styles = `
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

  .modal-input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;
  }

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
`;
