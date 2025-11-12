import React, { useState } from 'react';
import Label from '../../UI/Label/Label.jsx';
import Input from '../../UI/Input/Input.jsx';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage.jsx';

const styles = {
	modalOverlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1000,
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	},
	modalContainer: {
		background: 'white',
		borderRadius: '16px',
		boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
		maxWidth: '400px',
		width: '90%',
		animation: 'slideIn 0.3s ease-out',
	},
	modalHeader: {
		background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
		color: 'white',
		padding: '2rem',
		borderBottom: '1px solid #e5e7eb',
		borderRadius: '16px 16px 0 0',
	},
	modalHeaderH2: {
		margin: 0,
		fontSize: '1.5rem',
		fontWeight: '700',
	},
	modalBody: {
		padding: '2rem',
		textAlign: 'center',
	},
	warningIcon: {
		fontSize: '3rem',
		marginBottom: '1rem',
	},
	bodyP: {
		color: '#6b7280',
		fontSize: '1rem',
		margin: '0.5rem 0',
		lineHeight: '1.5',
	},
	modalFooter: {
		display: 'flex',
		gap: '1rem',
		padding: '1.5rem 2rem',
		borderTop: '1px solid #e5e7eb',
		background: '#f8f9fa',
		borderRadius: '0 0 16px 16px',
	},
	btn: {
		flex: 1,
		padding: '0.75rem 1rem',
		border: 'none',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
	},
	btnDanger: {
		background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
		color: 'white',
		boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
	},
	btnSecondary: {
		background: '#e5e7eb',
		color: '#1f2937',
	},
};

const keyframes = `
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export default function DeleteUserModal({ isOpen, onClose, onSubmit }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setError('El ID del usuario es requerido');
      return;
    }

    // Pedir confirmación
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulamos un pequeño delay para mejor UX
      setTimeout(() => {
        // Obtener usuarios del localStorage
        const users = typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('usuarios') || '[]')
          : [];

        // Buscar el índice del usuario a eliminar
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          setError('Usuario no encontrado');
          setLoading(false);
          return;
        }

        // Eliminar usuario
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);

        // Guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(users));

        if (onSubmit) {
          onSubmit({ id: userId });
        }

        alert('Usuario eliminado exitosamente');
        setUserId('');
        onClose();
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      setError(err.message || 'Error al eliminar usuario');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalHeaderH2}>Eliminar Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.modalBody}>
              {error && <ErrorMessage message={error} />}

              <div style={styles.warningIcon}>⚠️</div>
              <p style={styles.bodyP}>
                <strong>Esta acción no se puede deshacer.</strong>
              </p>
              <p style={styles.bodyP}>
                El usuario será eliminado permanentemente del sistema.
              </p>

              <div style={{ margin: '1.5rem 0', textAlign: 'left' }}>
                <Label htmlFor="userId">ID del Usuario a Eliminar *</Label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="Ingresa el ID del usuario"
                  value={userId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                type="button"
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={onClose}
                disabled={loading}
                onMouseEnter={(e) => e.target.style.background = '#d1d5db'}
                onMouseLeave={(e) => e.target.style.background = '#e5e7eb'}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{ ...styles.btn, ...styles.btnDanger }}
                disabled={loading}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                }}
              >
                {loading ? 'Eliminando...' : 'Eliminar Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
