import { useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';

export default function UploadFileModal({ onClose, onFileUploaded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Documento');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!name) {
        setName(file.name);
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido';
    if (!selectedFile) newErrors.file = 'Debe seleccionar un archivo';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        const newFile = {
          id: Date.now().toString(),
          name,
          description,
          type,
          tags,
          size: selectedFile.size,
          mimeType: selectedFile.type,
          uploadedAt: new Date().toISOString(),
          data: e.target?.result,
        };
        files.push(newFile);
        localStorage.setItem('files', JSON.stringify(files));
        onFileUploaded?.(newFile);
        onClose();
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      setErrors({ ...errors, upload: 'Error al subir el archivo' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Subir Archivo</h3>
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

        <div className="form-group">
          <label>Seleccionar Archivo *</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--border-radius)',
              border: '2px dashed var(--border-color)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              transition: 'all var(--transition-normal)',
              fontSize: '0.875rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.backgroundColor = 'var(--form-element-bg-color)';
            }}
          >
            <Upload size={24} color="var(--primary-color)" />
            <span>{selectedFile ? selectedFile.name : 'Click o arrastra un archivo'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {errors.file && <span className="error-message">{errors.file}</span>}
        </div>

        <div className="form-group">
          <label>Nombre del Archivo *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del archivo"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del archivo..."
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

        <div className="form-group">
          <label>Etiquetas (separadas por comas)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ej: proyecto, importante, urgente"
          />
        </div>

        {errors.upload && <span className="error-message" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>{errors.upload}</span>}

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
            Subir Archivo
          </button>
        </div>
      </div>
    </div>
  );
}
