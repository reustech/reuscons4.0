import { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function DeleteProjectModal({ onClose, onProjectDeleted }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleDelete = () => {
    if (!selectedProjectId) return;

    const updatedProjects = projects.filter((p) => p.id !== selectedProjectId);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    onProjectDeleted?.();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Eliminar Proyecto</h3>
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
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay proyectos para eliminar</p>
        ) : (
          <>
            <div className="form-group">
              <label>Seleccionar Proyecto *</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedProject && (
              <div
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertTriangle size={20} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', fontSize: '0.95rem' }}>
                      ¡Atención!
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
                      Está a punto de eliminar el proyecto: <strong>{selectedProject.name}</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                      Esta acción no se puede deshacer. Todos los datos del proyecto serán eliminados permanentemente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-button-group">
              <button
                onClick={onClose}
                className="modal-btn modal-btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={!selectedProjectId}
                className="modal-btn modal-btn-danger"
                style={{
                  backgroundColor: selectedProjectId ? '#ef4444' : 'rgba(239, 68, 68, 0.5)',
                  cursor: selectedProjectId ? 'pointer' : 'not-allowed',
                }}
              >
                Eliminar Proyecto
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
