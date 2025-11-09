import React from 'react';

export default function TaskCard({
  task,
  columnKey,
  columnColor,
  isEditing,
  editingText,
  onEditChange,
  onEditSave,
  onEditCancel,
  onEdit,
  onDelete,
  onDragStart,
}) {
  if (isEditing) {
    return (
      <div className="task-edit">
        <input
          type="text"
          value={editingText}
          onChange={(e) => onEditChange(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEditSave();
            } else if (e.key === 'Escape') {
              onEditCancel();
            }
          }}
        />
        <div className="edit-buttons">
          <button className="btn-save" onClick={onEditSave}>
            ✓
          </button>
          <button className="btn-cancel" onClick={onEditCancel}>
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="task-card"
      draggable
      data-task-id={task.id}
      onDragStart={(e) => onDragStart(e, task.id, columnKey)}
      style={{ borderLeftColor: columnColor }}
    >
      <div className="task-content">
        <span className="task-text">{task.title}</span>
      </div>
      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(task)}
          title="Editar"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(columnKey, task.id)}
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
