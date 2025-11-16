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
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>
            ⚠️
          </div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)', fontSize: '1.1rem' }}>
            Eliminar Usuario
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
            ¿Estás seguro de que deseas eliminar a <strong>{user?.username}</strong>?
            <br />
            Esta acción <strong>no se puede deshacer</strong>.
          </p>
        </div>

        {/* User Details */}
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--border-radius)',
            marginBottom: 'var(--spacing-md)',
            border: '1px solid var(--form-element-border-color)',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Usuario:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.username}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Email:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.profile?.email}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Nombre:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                {user?.profile?.firstName} {user?.profile?.lastName}
              </p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
              <p
                style={{
                  color: user?.active ? '#4ade80' : '#ef4444',
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
        <div className="modal-button-group">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="modal-btn-danger"
            style={{
              backgroundColor: isDeleting ? '#999' : undefined,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
          >
            {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="modal-btn-secondary"
            style={{
              opacity: isDeleting ? 0.6 : 1,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
