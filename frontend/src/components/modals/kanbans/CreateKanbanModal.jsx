import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function CreateKanbanModal({ onClose, onKanbanCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [columns, setColumns] = useState([
    { id: '1', name: 'Por Hacer' },
    { id: '2', name: 'En Progreso' },
    { id: '3', name: 'Completado' },
  ]);
  const [newColumnName, setNewColumnName] = useState('');
  const [errors, setErrors] = useState({});

  const addColumn = () => {
    if (!newColumnName.trim()) {
      setErrors({ ...errors, newColumn: 'El nombre de la columna es requerido' });
      return;
    }
    setColumns([...columns, { id: Date.now().toString(), name: newColumnName }]);
    setNewColumnName('');
    setErrors({ ...errors, newColumn: '' });
  };

  const removeColumn = (id) => {
    if (columns.length > 1) {
      setColumns(columns.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido';
    if (columns.length === 0) newErrors.columns = 'Al menos una columna es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const kanbans = JSON.parse(localStorage.getItem('kanbans') || '[]');
      const newKanban = {
        id: Date.now().toString(),
        name,
        description,
        columns: columns.map((c) => ({ name: c.name })),
        createdAt: new Date().toISOString(),
      };
      kanbans.push(newKanban);
      localStorage.setItem('kanbans', JSON.stringify(kanbans));
      onKanbanCreated?.(newKanban);
      onClose();
    } catch (error) {
      console.error('Error creando kanban:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '550px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Crear Tablero Kanban</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div className="form-group">
          <label>Nombre del Tablero *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Sprint 1"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del tablero..."
            style={{ minHeight: '60px' }}
          />
        </div>

        <div className="form-group">
          <label>Columnas ({columns.length})</label>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: 'var(--spacing-xs)' }}>
            {columns.map((column) => (
              <div
                key={column.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-xs)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <span>{column.name}</span>
                <button
                  onClick={() => removeColumn(column.id)}
                  disabled={columns.length <= 1}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: columns.length <= 1 ? 'not-allowed' : 'pointer',
                    color: columns.length <= 1 ? 'rgba(239, 68, 68, 0.5)' : '#ef4444',
                    opacity: columns.length <= 1 ? 0.5 : 1,
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Nueva columna..."
              style={{
                flex: 1,
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--form-element-border-color)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
              }}
            />
            <button
              onClick={addColumn}
              style={{
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: 'none',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Plus size={16} />
            </button>
          </div>
          {errors.newColumn && <span className="error-message">{errors.newColumn}</span>}
          {errors.columns && <span className="error-message">{errors.columns}</span>}
        </div>
        </div>

        <div className="modal-button-group">
          <button
            onClick={onClose}
            className="modal-btn modal-btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="modal-btn"
          >
            Crear Tablero
          </button>
        </div>
      </div>
    </div>
  );
}
