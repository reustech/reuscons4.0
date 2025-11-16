import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SCHEMAS } from '../../../schemas/validation.schemas';

export default function CreateUserModal({ onClose, onUserCreated }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(SCHEMAS.userQuick),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      // Obtener usuarios del localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      // Verificar si el usuario ya existe
      if (existingUsers.some((u) => u.username === data.username)) {
        alert('El nombre de usuario ya existe');
        return;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        ...data,
      };

      // Guardar en localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Notificar al componente padre
      if (onUserCreated) {
        onUserCreated(newUser);
      }

      // Limpiar formulario y cerrar modal
      reset();
      onClose();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--form-element-bg-color)',
          borderRadius: 'var(--border-radius)',
          padding: 'var(--spacing-lg)',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          Crear Nuevo Usuario
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div className="modal-form-columns">
            {/* Username */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Nombre de Usuario *
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="john_doe"
                style={{
                  borderColor: errors.username ? '#ef4444' : undefined,
                }}
              />
              {errors.username && (
                <span className="error-message">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Contraseña *
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                style={{
                  borderColor: errors.password ? '#ef4444' : undefined,
                }}
              />
              {errors.password && (
                <span className="error-message">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* First Name */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Nombre *
              </label>
              <input
                {...register('profile.firstName')}
                type="text"
                placeholder="John"
                style={{
                  borderColor: errors.profile?.firstName ? '#ef4444' : undefined,
                }}
              />
              {errors.profile?.firstName && (
                <span className="error-message">
                  {errors.profile.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Apellido *
              </label>
              <input
                {...register('profile.lastName')}
                type="text"
                placeholder="Doe"
                style={{
                  borderColor: errors.profile?.lastName ? '#ef4444' : undefined,
                }}
              />
              {errors.profile?.lastName && (
                <span className="error-message">
                  {errors.profile.lastName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group modal-form-columns-full">
              <label style={{ color: 'var(--text-primary)' }}>
                Email *
              </label>
              <input
                {...register('profile.email')}
                type="email"
                placeholder="john@example.com"
                style={{
                  borderColor: errors.profile?.email ? '#ef4444' : undefined,
                }}
              />
              {errors.profile?.email && (
                <span className="error-message">
                  {errors.profile.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.875rem' }}>
            <input
              {...register('active')}
              type="checkbox"
              id="active"
              style={{
                width: '1rem',
                height: '1rem',
                cursor: 'pointer',
              }}
            />
            <label htmlFor="active" style={{ color: 'var(--text-primary)', cursor: 'pointer', marginBottom: 0 }}>
              Usuario Activo
            </label>
          </div>

          {/* Buttons */}
          <div className="modal-button-group">
            <button
              type="submit"
              disabled={isSubmitting}
              className="modal-btn"
              style={{
                backgroundColor: isSubmitting ? '#999' : undefined,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Creando...' : 'Crear Usuario'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="modal-btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
