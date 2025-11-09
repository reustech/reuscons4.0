import React, { useState } from 'react';
import './FileManager.css';

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
    <div className="file-manager-container">
      <div className="file-header">
        <h1>Gestor de Archivos</h1>
        <a href="/" className="btn-back">← Volver al Kanban</a>
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
  );
}
