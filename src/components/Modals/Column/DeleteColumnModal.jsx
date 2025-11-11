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
`;

export default function BorrarColumnaModal({ isOpen, onClose, onSubmit }) {
  const [columnaId, setColumnaId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && columnaId.trim()) {
      onSubmit({ id: columnaId });
      setColumnaId('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Eliminar Columna</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="warning-icon">⚠️</div>
              <p>
                <strong>Esta acción no se puede deshacer.</strong>
              </p>
              <p>
                La columna será eliminada permanentemente del sistema.
              </p>

              <div className="form-group">
                <label htmlFor="columnaId">ID de la Columna a Eliminar *</label>
                <input
                  type="text"
                  id="columnaId"
                  value={columnaId}
                  onChange={(e) => setColumnaId(e.target.value)}
                  placeholder="Ingresa el ID de la columna"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-danger">
                Eliminar Columna
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
