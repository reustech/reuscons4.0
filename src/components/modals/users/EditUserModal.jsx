import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SCHEMAS } from '../../../schemas/validation.schemas';

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
        <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
          Editar Usuario: {user?.username}
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

          {/* Password (opcional en edición) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Contraseña (Dejar vacío para no cambiar)
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

          {/* Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Teléfono
            </label>
            <input
              {...register('profile.phone')}
              placeholder="+1-555-1234"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.phone ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.profile?.phone && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.profile.phone.message}
              </span>
            )}
          </div>

          {/* Mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Móvil
            </label>
            <input
              {...register('profile.mobile')}
              placeholder="+1-555-5678"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.mobile ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
            {errors.profile?.mobile && (
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {errors.profile.mobile.message}
              </span>
            )}
          </div>

          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Empresa
            </label>
            <input
              {...register('profile.company')}
              placeholder="TechCorp"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.company ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
          </div>

          {/* Position */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Puesto
            </label>
            <input
              {...register('profile.position')}
              placeholder="Developer"
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: errors.profile?.position ? '1px solid #ff6b6b' : '1px solid var(--form-element-border-color)',
                borderRadius: 'var(--border-radius)',
              }}
            />
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
              {isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
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
