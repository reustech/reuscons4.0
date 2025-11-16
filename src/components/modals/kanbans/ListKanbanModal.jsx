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
      <div style={{ ...styles.modalContent, maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Tableros Kanban</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {kanbans.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay tableros Kanban creados</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {kanbans.map((kanban) => (
              <div
                key={kanban.id}
                style={{
                  padding: 'var(--spacing-md)',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--primary-color)' }}>
                  {kanban.name}
                </h4>
                {kanban.description && (
                  <p style={{ margin: '0 0 var(--spacing-xs) 0', fontSize: '0.875rem', opacity: 0.8 }}>
                    {kanban.description}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>
                  Columnas: {kanban.columns?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--border-radius)',
            border: 'none',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  modalContent: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-lg)',
    width: '90%',
  },
};
