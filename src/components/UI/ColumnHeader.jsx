import React from 'react';

export default function ColumnHeader({ title, count, color }) {
  return (
    <div className="column-header" style={{ borderColor: color }}>
      <h2 className="column-title">{title}</h2>
      <span className="task-count">{count}</span>
    </div>
  );
}
