import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function ListProjectModal({ onClose }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

  return (
    <div className="modal-overlay">
      <div style={{ ...styles.modalContent, maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Proyectos</h3>
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

        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay proyectos creados</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  padding: 'var(--spacing-md)',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--primary-color)' }}>
                  {project.name}
                </h4>
                {project.description && (
                  <p style={{ margin: '0 0 var(--spacing-xs) 0', fontSize: '0.875rem', opacity: 0.8 }}>
                    {project.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', fontSize: '0.875rem', opacity: 0.7 }}>
                  <span>Estado: {project.status}</span>
                  {project.manager && <span>Gerente: {project.manager}</span>}
                </div>
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
