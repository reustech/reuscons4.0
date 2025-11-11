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

export default function EditUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id.trim()) {
      setError('El ID del usuario es requerido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updateData = {};
      if (formData.username.trim()) updateData.username = formData.username;
      if (formData.email.trim()) updateData.email = formData.email;
      if (formData.role) updateData.role = formData.role;

      const response = await fetch(`/api/usuarios/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar usuario');
      }

      if (onSubmit) {
        onSubmit(result.data);
      }

      alert('Usuario actualizado exitosamente');
      setFormData({
        id: '',
        username: '',
        email: '',
        role: 'user'
      });
      onClose();
    } catch (err) {
      console.error('Error actualizando usuario:', err);
      setError(err.message || 'Error al actualizar usuario');
    } finally {
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
            <h2 style={styles.modalHeaderH2}>Modificar Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.modalBody}>
              {error && <ErrorMessage message={error} />}

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="id">ID del Usuario *</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="ID del usuario a modificar"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="usuario123"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
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
                {loading ? 'Actualizando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
