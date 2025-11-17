import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

export default function DownloadFileModal({ onClose }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setFiles(savedFiles);
  }, []);

  const handleDownload = (file) => {
    if (file.data) {
      const link = document.createElement('a');
      link.href = file.data;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Descargar Archivos</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay archivos disponibles</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-sm)',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--form-element-bg-color)',
                  marginBottom: 'var(--spacing-xs)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                    {file.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                    {file.type}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(file)}
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
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  <Download size={16} />
                  Descargar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="modal-button-group">
          <button onClick={onClose} className="modal-btn">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
