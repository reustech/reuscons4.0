import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

export default function ListFileModal({ onClose }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setFiles(savedFiles);
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="modal-overlay">
      <div style={{ ...styles.modalContent, maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Archivos del Sistema</h3>
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

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay archivos</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--form-element-bg-color)' }}>
                  <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Nombre</th>
                  <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Tipo</th>
                  <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Tamaño</th>
                  <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 'var(--spacing-sm)' }}>{file.name}</td>
                    <td style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.8 }}>{file.type}</td>
                    <td style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.8 }}>
                      {file.size ? formatFileSize(file.size) : 'N/A'}
                    </td>
                    <td style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.8 }}>
                      {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString('es-ES') : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--border-radius)',
            border: 'none',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Cerrar
        </button>
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
