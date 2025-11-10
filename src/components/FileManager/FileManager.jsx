import React, { useState } from 'react';

const styles = `
  .file-manager-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .file-header {
    max-width: 1000px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .file-header h1 {
    color: white;
    font-size: 2.5rem;
    margin: 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-back {
    background: white;
    color: #667eea;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-back:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .file-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .upload-section {
    margin-bottom: 2rem;
  }

  .upload-area {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .upload-label {
    display: block;
    cursor: pointer;
  }

  .file-input {
    display: none;
  }

  .upload-box {
    padding: 3rem 2rem;
    text-align: center;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  .upload-label:hover .upload-box {
    background: linear-gradient(135deg, #f0f4ff 0%, #f8f9fa 100%);
  }

  .upload-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .upload-box h2 {
    color: #1f2937;
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
  }

  .upload-box p {
    color: #6b7280;
    margin: 0;
    font-size: 0.95rem;
  }

  .files-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .section-title {
    color: #1f2937;
    font-size: 1.25rem;
    margin: 0 0 1.5rem;
    font-weight: 600;
  }

  .no-files {
    color: #9ca3af;
    text-align: center;
    padding: 2rem;
    font-size: 1rem;
  }

  .files-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s ease;
    background: #f9fafb;
  }

  .file-item:hover {
    background: #f3f4f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 0;
  }

  .file-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .file-details {
    min-width: 0;
  }

  .file-details h3 {
    margin: 0 0 0.25rem;
    color: #1f2937;
    font-size: 0.95rem;
    font-weight: 600;
    word-break: break-word;
  }

  .file-details p {
    margin: 0;
    color: #9ca3af;
    font-size: 0.85rem;
  }

  .file-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .btn-download,
  .btn-delete-file {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.5rem;
    transition: transform 0.2s ease;
    border-radius: 6px;
  }

  .btn-download:hover,
  .btn-delete-file:hover {
    transform: scale(1.2);
    background: rgba(0, 0, 0, 0.05);
  }

  .btn-delete-file:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  @media (max-width: 768px) {
    .file-manager-container {
      padding: 1rem;
    }

    .file-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .file-header h1 {
      font-size: 1.75rem;
    }

    .btn-back {
      width: 100%;
      justify-content: center;
    }

    .upload-box {
      padding: 2rem 1rem;
    }

    .upload-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .upload-box h2 {
      font-size: 1.1rem;
    }

    .files-section {
      padding: 1rem;
    }

    .file-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .file-info {
      width: 100%;
    }

    .file-actions {
      width: 100%;
      margin-left: 0;
      justify-content: flex-end;
    }
  }
`;

export default function FileManager() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          size: (file.size / 1024).toFixed(2),
          type: file.type,
          data: event.target.result,
          uploadDate: new Date().toLocaleDateString('es-ES'),
        }]);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleDownload = (file) => {
    const blob = new Blob([file.data], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDelete = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="file-manager-container">
        <div className="file-header">
          <h1>Gestor de Archivos</h1>
          <a href="/Kanban" className="btn-back">← Volver al Kanban</a>
        </div>

      <div className="file-content">
        <div className="upload-section">
          <div className="upload-area">
            <label className="upload-label">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
              />
              <div className="upload-box">
                <span className="upload-icon">📤</span>
                <h2>Arrastra archivos aquí o haz clic para seleccionar</h2>
                <p>Soporta cualquier tipo de archivo</p>
              </div>
            </label>
          </div>
        </div>

        <div className="files-section">
          <h2 className="section-title">Archivos subidos ({files.length})</h2>

          {files.length === 0 ? (
            <p className="no-files">No hay archivos subidos aún</p>
          ) : (
            <div className="files-list">
              {files.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <span className="file-icon">📄</span>
                    <div className="file-details">
                      <h3>{file.name}</h3>
                      <p>{file.size} KB • {file.uploadDate}</p>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(file)}
                      title="Descargar"
                    >
                      ⬇️
                    </button>
                    <button
                      className="btn-delete-file"
                      onClick={() => handleDelete(file.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
