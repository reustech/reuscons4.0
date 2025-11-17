import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function EditFileModal({ onClose, onFileUpdated }) {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Documento');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setFiles(savedFiles);
  }, []);

  const selectedFile = files.find((f) => f.id === selectedFileId);

  useEffect(() => {
    if (selectedFile) {
      setName(selectedFile.name);
      setDescription(selectedFile.description || '');
      setType(selectedFile.type || 'Documento');
      setTags(selectedFile.tags || '');
    }
  }, [selectedFile]);

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedFiles = files.map((f) =>
        f.id === selectedFileId
          ? { ...f, name, description, type, tags, updatedAt: new Date().toISOString() }
          : f
      );
      localStorage.setItem('files', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
      onFileUpdated?.();
      onClose();
    } catch (error) {
      console.error('Error actualizando archivo:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Editar Archivo</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>No hay archivos para editar</p>
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
              <>
                <div className="form-group">
                  <label>Nombre *</label>
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
                  <label>Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Documento">Documento</option>
                    <option value="Imagen">Imagen</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Otro">Otro</option>
                  </select>
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
          </>
        )}
      </div>
    </div>
  );
}
