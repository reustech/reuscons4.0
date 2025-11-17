import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SCHEMAS } from '../../../shared/schemas/validation.schemas';

export default function EditUserModal({ user, onClose, onUserUpdated }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(SCHEMAS.userEdit),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        password: '',
        profile: {
          firstName: user.profile?.firstName || '',
          lastName: user.profile?.lastName || '',
          email: user.profile?.email || '',
          phone: user.profile?.phone || '',
          mobile: user.profile?.mobile || '',
          company: user.profile?.company || '',
          position: user.profile?.position || '',
          address: user.profile?.address || '',
          city: user.profile?.city || '',
          country: user.profile?.country || '',
          zipCode: user.profile?.zipCode || '',
          website: user.profile?.website || '',
        },
        active: user.active !== false,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Encontrar el índice del usuario
      const userIndex = users.findIndex((u) => u.id === user.id || u.username === user.username);

      if (userIndex === -1) {
        alert('Usuario no encontrado');
        return;
      }

      // Actualizar usuario
      const updatedUser = {
        ...users[userIndex],
        username: data.username,
        profile: data.profile,
        active: data.active,
      };

      // Si se proporciona contraseña, actualizarla
      if (data.password) {
        updatedUser.password = data.password;
      }

      // Actualizar en el array
      users[userIndex] = updatedUser;

      // Guardar en localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Notificar al componente padre
      if (onUserUpdated) {
        onUserUpdated(updatedUser);
      }

      onClose();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario');
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
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          Editar Usuario: {user?.username}
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

            {/* Password (opcional en edición) */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Contraseña
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
            <div className="form-group">
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

            {/* Phone */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Teléfono
              </label>
              <input
                {...register('profile.phone')}
                type="text"
                placeholder="+1-555-1234"
                style={{
                  borderColor: errors.profile?.phone ? '#ef4444' : undefined,
                }}
              />
              {errors.profile?.phone && (
                <span className="error-message">
                  {errors.profile.phone.message}
                </span>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Móvil
              </label>
              <input
                {...register('profile.mobile')}
                type="text"
                placeholder="+1-555-5678"
                style={{
                  borderColor: errors.profile?.mobile ? '#ef4444' : undefined,
                }}
              />
              {errors.profile?.mobile && (
                <span className="error-message">
                  {errors.profile.mobile.message}
                </span>
              )}
            </div>

            {/* Company */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Empresa
              </label>
              <input
                {...register('profile.company')}
                type="text"
                placeholder="TechCorp"
              />
            </div>

            {/* Position */}
            <div className="form-group">
              <label style={{ color: 'var(--text-primary)' }}>
                Puesto
              </label>
              <input
                {...register('profile.position')}
                type="text"
                placeholder="Developer"
              />
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
              {isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
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
