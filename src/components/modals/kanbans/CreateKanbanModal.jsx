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
      <div style={{ ...styles.modalContent, maxWidth: '550px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Crear Tablero Kanban</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Nombre del Tablero *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Sprint 1"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--form-element-border-color)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
            }}
          />
          {errors.name && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del tablero..."
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--form-element-border-color)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
              minHeight: '60px',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Columnas ({columns.length})
          </label>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: 'var(--spacing-sm)' }}>
            {columns.map((column) => (
              <div
                key={column.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-sm)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-xs)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-color)',
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
                  <Trash2 size={18} />
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
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--form-element-border-color)',
                backgroundColor: 'var(--form-element-bg-color)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={addColumn}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
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
              <Plus size={18} />
            </button>
          </div>
          {errors.newColumn && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.newColumn}</p>}
          {errors.columns && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.columns}</p>}
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius)',
              border: 'none',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Crear Tablero
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalContent: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-lg)',
    width: '90%',
  },
};
