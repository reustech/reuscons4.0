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
  .form-group textarea,
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

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-group input:focus,
  .form-group textarea:focus,
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
`;

export default function CrearObraModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    client: '',
    status: 'pending',
    kanbanId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      name: '',
      description: '',
      location: '',
      client: '',
      status: 'pending',
      kanbanId: ''
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Crear Nueva Obra</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Nombre de la Obra *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del proyecto"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="client">Cliente *</label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Nombre del cliente"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Dirección o localidad"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción de la obra..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="completed">Completada</option>
                  <option value="on_hold">En Espera</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="kanbanId">Kanban *</label>
                <input
                  type="text"
                  id="kanbanId"
                  name="kanbanId"
                  value={formData.kanbanId}
                  onChange={handleChange}
                  placeholder="ID del kanban asociado"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Crear Obra
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
