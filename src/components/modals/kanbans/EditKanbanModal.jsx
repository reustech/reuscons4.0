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
      <div style={{ ...styles.modalContent, maxWidth: '550px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Editar Tablero Kanban</h3>
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

        {kanbans.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay tableros para editar</p>
        ) : (
          <>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                Seleccionar Tablero *
              </label>
              <select
                value={selectedKanbanId}
                onChange={(e) => setSelectedKanbanId(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--form-element-border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  color: 'var(--text-primary)',
                }}
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
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                    Nombre del Tablero *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    Actualizar
                  </button>
                </div>
              </>
            )}
          </>
        )}
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
