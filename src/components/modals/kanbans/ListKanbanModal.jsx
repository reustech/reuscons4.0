import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function ListKanbanModal({ onClose }) {
  const [kanbans, setKanbans] = useState([]);

  useEffect(() => {
    const savedKanbans = JSON.parse(localStorage.getItem('kanbans') || '[]');
    setKanbans(savedKanbans);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Tableros Kanban</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {kanbans.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay tableros Kanban creados</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {kanbans.map((kanban) => (
              <div
                key={kanban.id}
                style={{
                  padding: 'var(--spacing-sm)',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-xs)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                  {kanban.name}
                </h4>
                {kanban.description && (
                  <p style={{ margin: '0 0 var(--spacing-xs) 0', fontSize: '0.75rem', opacity: 0.8 }}>
                    {kanban.description}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  Columnas: {kanban.columns?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="modal-button-group">
          <button onClick={onClose} className="modal-btn">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
