import React, { useState } from 'react';
import Label from '../../UI/Label/Label.jsx';
import Input from '../../UI/Input/Input.jsx';
import Select from '../../UI/Select/Select.jsx';
import Button from '../../UI/Button/Button.jsx';
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
		maxWidth: '500px',
		width: '90%',
		maxHeight: '90vh',
		overflowY: 'auto',
		animation: 'slideIn 0.3s ease-out',
	},
	modalHeader: {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		color: 'white',
		padding: '2rem',
		borderBottom: '1px solid #e5e7eb',
	},
	modalHeaderH2: {
		margin: 0,
		fontSize: '1.5rem',
		fontWeight: '700',
	},
	modalBody: {
		padding: '2rem',
	},
	modalFooter: {
		display: 'flex',
		gap: '1rem',
		padding: '1.5rem 2rem',
		borderTop: '1px solid #e5e7eb',
		background: '#f8f9fa',
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
	btnPrimary: {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		color: 'white',
		boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
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

export default function CreateUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validación de campos requeridos
      if (!formData.username.trim()) {
        throw new Error('El usuario es requerido');
      }
      if (!formData.email.trim()) {
        throw new Error('El email es requerido');
      }

      // Simulamos un pequeño delay para mejor UX
      setTimeout(() => {
        // Crear nuevo usuario con ID único
        const newUser = {
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          role: formData.role,
          createdAt: new Date().toISOString()
        };

        // Obtener usuarios existentes del localStorage
        const existingUsers = typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('usuarios') || '[]')
          : [];

        // Verificar duplicados
        if (existingUsers.some(u => u.username === newUser.username)) {
          setError('El usuario ya existe');
          setLoading(false);
          return;
        }

        // Agregar nuevo usuario
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('usuarios', JSON.stringify(updatedUsers));

        if (onSubmit) {
          onSubmit(newUser);
        }

        alert('Usuario creado exitosamente');
        setFormData({
          username: '',
          email: '',
          role: 'user'
        });
        onClose();
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error('Error creando usuario:', err);
      setError(err.message || 'Error al crear usuario');
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
            <h2 style={styles.modalHeaderH2}>Crear Nuevo Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.modalBody}>
              {error && <ErrorMessage message={error} />}

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="username">Usuario *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="usuario123"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="role">Rol</Label>
                <Select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="moderator">Moderador</option>
                </Select>
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
                style={{ ...styles.btn, ...styles.btnPrimary }}
                disabled={loading}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
              >
                {loading ? 'Creando...' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
