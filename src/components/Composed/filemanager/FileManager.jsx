import { useState, useEffect, useRef } from 'react';

export default function FileManager() {
	const [files, setFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef(null);

	// Cargar archivos del localStorage al montar
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedFiles = localStorage.getItem('files');
			if (savedFiles) {
				try {
					setFiles(JSON.parse(savedFiles));
				} catch (error) {
					console.error('Error al cargar archivos:', error);
				}
			}
		}
	}, []);

	// Guardar archivos en localStorage
	useEffect(() => {
		if (typeof window !== 'undefined' && files.length > 0) {
			localStorage.setItem('files', JSON.stringify(files));
		}
	}, [files]);

	const processFiles = async (fileList) => {
		setIsUploading(true);
		const filesArray = Array.from(fileList);

		for (const file of filesArray) {
			try {
				const content = await file.text();
				const newFile = {
					id: Date.now().toString() + Math.random(),
					name: file.name,
					type: file.type,
					size: file.size,
					uploadedAt: new Date().toLocaleDateString('es-ES'),
					content: content,
				};
				setFiles((prev) => [...prev, newFile]);
			} catch (error) {
				console.error(`Error al procesar ${file.name}:`, error);
			}
		}

		setIsUploading(false);
		setIsDragging(false);
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.classList.contains('upload-zone')) {
			setIsDragging(false);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		processFiles(e.dataTransfer.files);
	};

	const handleInputChange = (e) => {
		if (e.target.files) {
			processFiles(e.target.files);
			e.target.value = '';
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="file-manager-container">
			<div className="file-manager-header">
				<h1>Gestor de Archivos</h1>
				<p className="subtitle">Sube, gestiona y descarga tus archivos</p>
			</div>

			<div className="file-manager-content">
				{/* Zona de carga */}
				<div
					className={`upload-zone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onClick={handleClick}
				>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						onChange={handleInputChange}
						style={{ display: 'none' }}
					/>

					<div className="upload-icon">
						{isUploading ? (
							<span className="spinner">⟳</span>
						) : (
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="17 8 12 3 7 8" />
								<line x1="12" y1="3" x2="12" y2="15" />
							</svg>
						)}
					</div>

					<div className="upload-text">
						<p className="main-text">
							{isUploading ? 'Subiendo archivos...' : 'Arrastra archivos aquí o haz clic para seleccionar'}
						</p>
						<p className="sub-text">Puedes subir múltiples archivos a la vez</p>
					</div>
				</div>
			</div>
		</div>
	);
}
