import React from 'react';



export default function ColumnHeader({ title, count, color }) {
  return (
    <>
      <style>{styles}</style>
      <div className="column-header" style={{ borderColor: color }}>
        <h2 className="column-title">{title}</h2>
        <span className="task-count">{count}</span>
      </div>
    </>
  );
}

const styles = `
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
`;