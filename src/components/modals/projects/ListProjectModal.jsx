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
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Proyectos</h3>
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

        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay proyectos creados</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  padding: 'var(--spacing-sm)',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-xs)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                  {project.name}
                </h4>
                {project.description && (
                  <p style={{ margin: '0 0 var(--spacing-xs) 0', fontSize: '0.75rem', opacity: 0.8 }}>
                    {project.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', opacity: 0.7 }}>
                  <span>Estado: {project.status}</span>
                  {project.manager && <span>Gerente: {project.manager}</span>}
                </div>
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
