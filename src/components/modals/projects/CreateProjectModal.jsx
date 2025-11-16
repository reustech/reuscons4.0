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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Crear Nuevo Proyecto</h3>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
              Nombre del Proyecto *
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Ej: Sistema de Gestión"
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
              placeholder="Descripción del proyecto..."
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--form-element-border-color)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
                minHeight: '80px',
                fontFamily: 'inherit',
              }}
            />
            {errors.description && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.description.message}</p>}
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

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
              Presupuesto
            </label>
            <input
              {...register('budget', { valueAsNumber: true })}
              type="number"
              placeholder="0"
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--form-element-border-color)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
              Gerente del Proyecto
            </label>
            <input
              {...register('manager')}
              type="text"
              placeholder="Nombre del gerente"
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--form-element-border-color)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
              }}
            />
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
              {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
