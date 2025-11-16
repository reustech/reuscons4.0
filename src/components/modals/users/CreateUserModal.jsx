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
        <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
          Crear Nuevo Usuario
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {/* Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Nombre de Usuario *
            </label>
            <input
              {...register('username')}
              placeholder="john_doe"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.username ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.username && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Contraseña *
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.password ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.password && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* First Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Nombre *
            </label>
            <input
              {...register('profile.firstName')}
              placeholder="John"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.firstName ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.profile?.firstName && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.profile.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Apellido *
            </label>
            <input
              {...register('profile.lastName')}
              placeholder="Doe"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.lastName ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.profile?.lastName && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.profile.lastName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Email *
            </label>
            <input
              {...register('profile.email')}
              type="email"
              placeholder="john@example.com"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.email ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.profile?.email && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.profile.email.message}
              </span>
            )}
          </div>

          {/* Active Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            <label htmlFor="active" style={{ color: 'var(--text-primary)', fontWeight: 500, cursor: 'pointer' }}>
              Usuario Activo
            </label>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: 'var(--spacing-xs) var(--spacing-md)',
                backgroundColor: isSubmitting ? '#999' : 'var(--primary-color)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = 'var(--primary-dark)';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = 'var(--primary-color)';
              }}
            >
              {isSubmitting ? 'Creando...' : 'Crear Usuario'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: 'var(--spacing-xs) var(--spacing-md)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
                border: '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--border-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--form-element-bg-color)';
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
