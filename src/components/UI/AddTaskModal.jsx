import React from 'react';

export default function AddTaskModal({
  isOpen,
  columns,
  selectedColumn,
  modalInput,
  onColumnChange,
  onInputChange,
  onAdd,
  onClose,
}) {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAdd();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar Nueva Tarea</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label htmlFor="modal-column">Columna:</label>
          <select
            id="modal-column"
            value={selectedColumn}
            onChange={(e) => onColumnChange(e.target.value)}
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
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="modal-input"
            autoFocus
          />

          <button className="modal-btn-file">
            📎 Añadir Archivo
          </button>
        </div>
        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn-add" onClick={onAdd}>
            Agregar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}
