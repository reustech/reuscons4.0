import React, { useState } from 'react';

const styles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .modal-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;
  }

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

  .modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal-body {
    padding: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .modal-footer {
    display: flex;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #e5e7eb;
    background: #f8f9fa;
  }

  .btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: #e5e7eb;
    color: #1f2937;
  }

  .btn-secondary:hover {
    background: #d1d5db;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #fee2e2;
    color: #991b1b;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

export default function ModificarUsuarioModal({ isOpen, onClose, onSubmit }) {
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
      <style>{styles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Modificar Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="id">ID del Usuario *</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="ID del usuario a modificar"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="usuario123"
                  minLength={3}
                  maxLength={50}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="usuario@ejemplo.com"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="moderator">Moderador</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
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
