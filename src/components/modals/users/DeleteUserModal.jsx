import { useState } from 'react';

export default function DeleteUserModal({ user, onClose, onUserDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Filtrar el usuario a eliminar
      const updatedUsers = users.filter(
        (u) => u.id !== user.id && u.username !== user.username
      );

      // Guardar en localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Notificar al componente padre
      if (onUserDeleted) {
        onUserDeleted(user.id || user.username);
      }

      onClose();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario');
    } finally {
      setIsDeleting(false);
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
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon y Title */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <div
            style={{
              fontSize: '3rem',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            ⚠️
          </div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
            Eliminar Usuario
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
            ¿Estás seguro de que deseas eliminar a <strong>{user?.username}</strong>?
            <br />
            Esta acción <strong>no se puede deshacer</strong>.
          </p>
        </div>

        {/* User Details */}
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--border-radius)',
            marginBottom: 'var(--spacing-lg)',
            border: '1px solid var(--form-element-border-color)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Usuario:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.username}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.profile?.email}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nombre:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.profile?.firstName} {user?.profile?.lastName}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Estado:</span>
              <p
                style={{
                  color: user?.active ? '#4ade80' : '#ff6b6b',
                  fontWeight: 500,
                  margin: '0.25rem 0 0 0',
                }}
              >
                {user?.active ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              flex: 1,
              padding: 'var(--spacing-xs) var(--spacing-md)',
              backgroundColor: isDeleting ? '#999' : '#ff6b6b',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              fontWeight: 600,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) e.target.style.backgroundColor = '#ff5252';
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) e.target.style.backgroundColor = '#ff6b6b';
            }}
          >
            {isDeleting ? 'Eliminando...' : 'Sí, Eliminar Usuario'}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            style={{
              flex: 1,
              padding: 'var(--spacing-xs) var(--spacing-md)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
              border: '1px solid var(--form-element-border-color)',
              borderRadius: 'var(--border-radius)',
              fontWeight: 600,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast)',
              opacity: isDeleting ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) e.target.style.backgroundColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) e.target.style.backgroundColor = 'var(--form-element-bg-color)';
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
