import { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function DeleteFileModal({ onClose, onFileDeleted }) {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setFiles(savedFiles);
  }, []);

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleDelete = () => {
    if (!selectedFileId) return;

    const updatedFiles = files.filter((f) => f.id !== selectedFileId);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
    onFileDeleted?.();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Eliminar Archivo</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay archivos para eliminar</p>
        ) : (
          <>
            <div className="form-group">
              <label>Seleccionar Archivo *</label>
              <select
                value={selectedFileId}
                onChange={(e) => setSelectedFileId(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                {files.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedFile && (
              <div
                style={{
                  padding: 'var(--spacing-sm)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                  <AlertTriangle size={20} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: '#ef4444', fontSize: '0.95rem' }}>
                      ¡Atención!
                    </h4>
                    <p style={{ margin: '0 0 var(--spacing-xs) 0', fontSize: '0.875rem' }}>
                      Está a punto de eliminar: <strong>{selectedFile.name}</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-button-group">
              <button
                onClick={onClose}
                className="modal-btn modal-btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={!selectedFileId}
                className="modal-btn modal-btn-danger"
                style={{
                  backgroundColor: selectedFileId ? '#ef4444' : 'rgba(239, 68, 68, 0.5)',
                  cursor: selectedFileId ? 'pointer' : 'not-allowed',
                }}
              >
                Eliminar Archivo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
