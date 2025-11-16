import { useEffect, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function EditKanbanModal({ onClose, onKanbanUpdated }) {
  const [kanbans, setKanbans] = useState([]);
  const [selectedKanbanId, setSelectedKanbanId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedKanbans = JSON.parse(localStorage.getItem('kanbans') || '[]');
    setKanbans(savedKanbans);
  }, []);

  const selectedKanban = kanbans.find((k) => k.id === selectedKanbanId);

  useEffect(() => {
    if (selectedKanban) {
      setName(selectedKanban.name);
      setDescription(selectedKanban.description || '');
      setColumns(
        (selectedKanban.columns || []).map((c, idx) => ({
          id: `col_${idx}`,
          name: c.name,
        }))
      );
    }
  }, [selectedKanban]);

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
      const updatedKanbans = kanbans.map((k) =>
        k.id === selectedKanbanId
          ? {
              ...k,
              name,
              description,
              columns: columns.map((c) => ({ name: c.name })),
              updatedAt: new Date().toISOString(),
            }
          : k
      );
      localStorage.setItem('kanbans', JSON.stringify(updatedKanbans));
      setKanbans(updatedKanbans);
      onKanbanUpdated?.();
      onClose();
    } catch (error) {
      console.error('Error actualizando kanban:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '550px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Editar Tablero Kanban</h3>
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

        {kanbans.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay tableros para editar</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div className="form-group">
              <label>Seleccionar Tablero *</label>
              <select
                value={selectedKanbanId}
                onChange={(e) => setSelectedKanbanId(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                {kanbans.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedKanban && (
              <>
                <div className="form-group">
                  <label>Nombre del Tablero *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    Actualizar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
