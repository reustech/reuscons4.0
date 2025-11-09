import React from 'react';


export default function TaskCard({
  task,
  columnKey,
  columnColor,
  onDragStart,
  onDoubleClick,
}) {
  return (
    <>
      <style>{styles}</style>
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
    </>
  );
}



const styles = `
  .task-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-left: 4px solid;
    border-radius: 8px;
    padding: 1rem;
    cursor: grab;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 0.95rem;
    color: #374151;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .task-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .task-card:hover .task-menu-dots {
    opacity: 1;
  }

  .task-card:active {
    cursor: grabbing;
  }

  .task-card.dragging {
    opacity: 0.5;
    cursor: grabbing;
  }

  .task-content {
    flex: 1;
    min-width: 0;
  }

  .task-text {
    word-wrap: break-word;
    display: block;
  }

  .task-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.5rem;
  }

  .task-menu-dots {
    font-size: 1.2rem;
    color: #9ca3af;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, color 0.2s ease;
    user-select: none;
  }

  .task-menu-dots:hover {
    color: #374151;
  }
`;