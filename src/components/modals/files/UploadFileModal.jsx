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
      <div style={{ ...styles.modalContent, maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3>Subir Archivo</h3>
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

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Seleccionar Archivo *
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--border-radius)',
              border: '2px dashed var(--border-color)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              transition: 'all var(--transition-normal)',
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
            <Upload size={32} color="var(--primary-color)" />
            <span>{selectedFile ? selectedFile.name : 'Click o arrastra un archivo'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {errors.file && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.file}</p>}
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Nombre del Archivo *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del archivo"
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
            placeholder="Descripción del archivo..."
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

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>
            Etiquetas (separadas por comas)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ej: proyecto, importante, urgente"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--form-element-border-color)',
              backgroundColor: 'var(--form-element-bg-color)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {errors.upload && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: 'var(--spacing-md)' }}>{errors.upload}</p>}

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
            Subir Archivo
          </button>
        </div>
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
