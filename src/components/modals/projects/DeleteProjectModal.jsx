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
      <div style={{ ...styles.modalContent, maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Eliminar Proyecto</h3>
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
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay proyectos para eliminar</p>
        ) : (
          <>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                Seleccionar Proyecto *
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--form-element-border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  color: 'var(--text-primary)',
                }}
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
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
                  <AlertTriangle size={24} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: '#ef4444' }}>
                      ¡Atención!
                    </h4>
                    <p style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '0.95rem' }}>
                      Está a punto de eliminar el proyecto: <strong>{selectedProject.name}</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                      Esta acción no se puede deshacer. Todos los datos del proyecto serán eliminados permanentemente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={!selectedProjectId}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius)',
                  border: 'none',
                  backgroundColor: selectedProjectId ? '#ef4444' : 'rgba(239, 68, 68, 0.5)',
                  color: 'white',
                  cursor: selectedProjectId ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
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

const styles = {
  modalContent: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-lg)',
    width: '90%',
  },
};
