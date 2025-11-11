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
    max-width: 400px;
    width: 90%;
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
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 2rem;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 16px 16px 0 0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal-body {
    padding: 2rem;
    text-align: center;
  }

  .warning-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .modal-body p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .form-group {
    margin: 1.5rem 0;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    text-align: left;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .modal-footer {
    display: flex;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #e5e7eb;
    background: #f8f9fa;
    border-radius: 0 0 16px 16px;
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

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  }

  .btn-danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
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

export default function BorrarUsuarioModal({ isOpen, onClose, onSubmit }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
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
      const response = await fetch(`/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar usuario');
      }

      if (onSubmit) {
        onSubmit({ id: userId });
      }

      alert('Usuario eliminado exitosamente');
      setUserId('');
      onClose();
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      setError(err.message || 'Error al eliminar usuario');
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
            <h2>Eliminar Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="error-message">{error}</div>}

              <div className="warning-icon">⚠️</div>
              <p>
                <strong>Esta acción no se puede deshacer.</strong>
              </p>
              <p>
                El usuario será eliminado permanentemente del sistema.
              </p>

              <div className="form-group">
                <label htmlFor="userId">ID del Usuario a Eliminar *</label>
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={handleChange}
                  placeholder="Ingresa el ID del usuario"
                  required
                  disabled={loading}
                />
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
                className="btn btn-danger"
                disabled={loading}
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
