import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SCHEMAS } from '../../../schemas/validation.schemas';
import { X } from 'lucide-react';

export default function EditProjectModal({ onClose, onProjectUpdated }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
    resolver: zodResolver(SCHEMAS.project),
    mode: 'onBlur',
  });

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    if (selectedProject) {
      reset(selectedProject);
    }
  }, [selectedProject, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedProjects = projects.map((p) =>
        p.id === selectedProjectId ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      );
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      onProjectUpdated?.(data);
      onClose();
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div style={{ ...styles.modalContent, maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Editar Proyecto</h3>
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
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay proyectos para editar</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                    Nombre del Proyecto *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--form-element-border-color)',
                      backgroundColor: 'var(--form-element-bg-color)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  {errors.name && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name.message}</p>}
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                    Descripción
                  </label>
                  <textarea
                    {...register('description')}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--form-element-border-color)',
                      backgroundColor: 'var(--form-element-bg-color)',
                      color: 'var(--text-primary)',
                      minHeight: '60px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                    Estado
                  </label>
                  <select
                    {...register('status')}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--form-element-border-color)',
                      backgroundColor: 'var(--form-element-bg-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Pausado">Pausado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <button
                    type="button"
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
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderRadius: 'var(--border-radius)',
                      border: 'none',
                      backgroundColor: isSubmitting ? 'rgba(249, 115, 22, 0.5)' : 'var(--primary-color)',
                      color: 'white',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                  </button>
                </div>
              </>
            )}
          </form>
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
