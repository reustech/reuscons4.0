import React from 'react';

export default function TaskCard({
  task,
  columnKey,
  columnColor,
  onDragStart,
  onDoubleClick,
}) {
  return (
    <div
      className="task-card"
      draggable
      data-task-id={task.id}
      onDragStart={(e) => onDragStart(e, task.id, columnKey)}
      onDoubleClick={() => onDoubleClick(task, columnKey)}
      style={{ borderLeftColor: columnColor }}
    >
      <div className="task-content">
        <span className="task-text">{task.title}</span>
      </div>
      <div className="task-menu">
        <span className="task-menu-dots">⋯</span>
      </div>
    </div>
  );
}
