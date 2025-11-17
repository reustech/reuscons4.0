import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SCHEMAS } from '../../../schemas/validation.schemas';
import { X } from 'lucide-react';

export default function CreateProjectModal({ onClose, onProjectCreated }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(SCHEMAS.project),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const newProject = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));
      reset();
      onProjectCreated?.(newProject);
      onClose();
    } catch (error) {
      console.error('Error creando proyecto:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Crear Nuevo Proyecto</h3>
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

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div className="modal-form-columns">
            <div className="form-group modal-form-columns-full">
              <label>Nombre del Proyecto *</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Ej: Sistema de Gestión"
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-group modal-form-columns-full">
              <label>Descripción</label>
              <textarea
                {...register('description')}
                placeholder="Descripción del proyecto..."
                style={{ minHeight: '60px' }}
              />
              {errors.description && <span className="error-message">{errors.description.message}</span>}
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

            <div className="form-group">
              <label>Presupuesto</label>
              <input
                {...register('budget', { valueAsNumber: true })}
                type="number"
                placeholder="0"
              />
            </div>

            <div className="form-group modal-form-columns-full">
              <label>Gerente del Proyecto</label>
              <input
                {...register('manager')}
                type="text"
                placeholder="Nombre del gerente"
              />
            </div>
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
              {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
