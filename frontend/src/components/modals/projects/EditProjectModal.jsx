import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SCHEMAS } from '../../../shared/schemas/validation.schemas';
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
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Editar Proyecto</h3>
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
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay proyectos para editar</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
              <div className="modal-form-columns">
                <div className="form-group modal-form-columns-full">
                  <label>Nombre del Proyecto *</label>
                  <input
                    {...register('name')}
                    type="text"
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group modal-form-columns-full">
                  <label>Descripción</label>
                  <textarea
                    {...register('description')}
                    style={{ minHeight: '60px' }}
                  />
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select {...register('status')}>
                    <option value="Activo">Activo</option>
                    <option value="Pausado">Pausado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div className="modal-button-group">
                  <button
                    type="button"
                    onClick={onClose}
                    className="modal-btn modal-btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="modal-btn"
                    style={{
                      backgroundColor: isSubmitting ? 'rgba(249, 115, 22, 0.5)' : 'var(--primary-color)',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
