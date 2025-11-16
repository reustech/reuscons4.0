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
      <div style={{ ...styles.modalContent, maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Eliminar Archivo</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={24} />
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay archivos para eliminar</p>
        ) : (
          <>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                Seleccionar Archivo *
              </label>
              <select
                value={selectedFileId}
                onChange={(e) => setSelectedFileId(e.target.value)}
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
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
                  <AlertTriangle size={24} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: '#ef4444' }}>
                      ¡Atención!
                    </h4>
                    <p style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '0.95rem' }}>
                      Está a punto de eliminar: <strong>{selectedFile.name}</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                onClick={handleDelete}
                disabled={!selectedFileId}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius)',
                  border: 'none',
                  backgroundColor: selectedFileId ? '#ef4444' : 'rgba(239, 68, 68, 0.5)',
                  color: 'white',
                  cursor: selectedFileId ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
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

const styles = {
  modalContent: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-lg)',
    width: '90%',
  },
};
