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
      <div style={{ ...styles.modalContent, maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Editar Archivo</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={24} />
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No hay archivos para editar</p>
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
              <>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
                    Nombre *
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
                    Tipo
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--form-element-border-color)',
                      backgroundColor: 'var(--form-element-bg-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="Documento">Documento</option>
                    <option value="Imagen">Imagen</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Otro">Otro</option>
                  </select>
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
