import React, { useState } from 'react';

export default function UploadArchivoModal({
	isOpen,
	kanbanId,
	taskId,
	onClose,
	onSuccess
}) {
	const [formData, setFormData] = useState({
		description: '',
		userId: ''
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [dragActive, setDragActive] = useState(false);

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles && droppedFiles[0]) {
			setFile(droppedFiles[0]);
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			setError('Por favor selecciona un archivo');
			return;
		}

		setLoading(true);
		setError('');

		try {
			const formDataToSend = new FormData();
			formDataToSend.append('file', file);
			formDataToSend.append('description', formData.description || '');
			formDataToSend.append('userId', formData.userId || '');
			if (kanbanId) formDataToSend.append('kanbanId', kanbanId);
			if (taskId) formDataToSend.append('taskId', taskId);

			const response = await fetch('/api/archivos', {
				method: 'POST',
				body: formDataToSend
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al subir el archivo');
				return;
			}

			setFile(null);
			setFormData({
				description: '',
				userId: ''
			});

			if (onSuccess) {
				onSuccess(data.data);
			}

			onClose();
		} catch (err) {
			setError('Error de conexión: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<style>{styles}</style>
			<div className="modal-overlay" onClick={onClose}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-header">
						<h2>Subir Archivo</h2>
						<button type="button" className="modal-close" onClick={onClose}>✕</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							{error && <div className="modal-error">{error}</div>}

							<div
								className={`file-drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
								onDragEnter={handleDrag}
								onDragLeave={handleDrag}
								onDragOver={handleDrag}
								onDrop={handleDrop}
							>
								{file ? (
									<div className="file-preview">
										<div className="file-icon">📄</div>
										<div className="file-name">{file.name}</div>
										<div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
										<button
											type="button"
											className="file-remove"
											onClick={() => setFile(null)}
										>
											Cambiar archivo
										</button>
									</div>
								) : (
									<>
										<div className="drop-icon">📁</div>
										<p className="drop-text">Arrastra tu archivo aquí o</p>
										<label htmlFor="file-input" className="file-input-label">
											haz clic para seleccionar
										</label>
										<input
											id="file-input"
											type="file"
											onChange={handleFileChange}
											className="file-input-hidden"
										/>
									</>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="description">Descripción (opcional)</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Descripción del archivo"
									maxLength="500"
									rows="3"
									className="modal-textarea"
								/>
								<span className="char-count">{formData.description.length}/500</span>
							</div>

							<div className="form-group">
								<label htmlFor="userId">Usuario (ID) (opcional)</label>
								<input
									id="userId"
									type="text"
									name="userId"
									value={formData.userId}
									onChange={handleInputChange}
									placeholder="ID del usuario"
									className="modal-input"
								/>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="modal-btn-cancel"
								onClick={onClose}
								disabled={loading}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="modal-btn-add"
								disabled={loading || !file}
							>
								{loading ? 'Subiendo...' : 'Subir Archivo'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

const styles = `
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease;
		overflow-y: auto;
		padding: 1rem;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 500px;
		width: 100%;
		animation: slideIn 0.3s ease;
		max-height: 90vh;
		overflow-y: auto;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideIn {
		from {
			transform: translateY(-50px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
		position: sticky;
		top: 0;
		background: white;
		z-index: 1;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: #1f2937;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #6b7280;
		transition: color 0.2s ease;
		padding: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-close:hover {
		color: #1f2937;
	}

	.modal-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.file-drop-zone {
		border: 2px dashed #d1d5db;
		border-radius: 8px;
		padding: 2rem 1.5rem;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease;
		background: #f9fafb;
	}

	.file-drop-zone:hover {
		border-color: #3b82f6;
		background: #eff6ff;
	}

	.file-drop-zone.active {
		border-color: #3b82f6;
		background: #dbeafe;
	}

	.file-drop-zone.has-file {
		border-color: #10b981;
		background: #f0fdf4;
	}

	.drop-icon {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.drop-text {
		margin: 0.5rem 0;
		color: #6b7280;
		font-size: 0.95rem;
	}

	.file-input-label {
		color: #3b82f6;
		font-weight: 600;
		cursor: pointer;
		text-decoration: underline;
	}

	.file-input-hidden {
		display: none;
	}

	.file-preview {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.file-icon {
		font-size: 2.5rem;
	}

	.file-name {
		font-weight: 600;
		color: #1f2937;
		word-break: break-all;
		max-width: 100%;
	}

	.file-size {
		font-size: 0.85rem;
		color: #6b7280;
	}

	.file-remove {
		background: #ef4444;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.5rem 1rem;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-top: 0.5rem;
	}

	.file-remove:hover {
		background: #dc2626;
		transform: translateY(-1px);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.95rem;
		font-weight: 600;
		color: #374151;
	}

	.modal-input,
	.modal-textarea {
		border: 1px solid #d1d5db;
		border-radius: 8px;
		padding: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.modal-input:focus,
	.modal-textarea:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.modal-textarea {
		resize: vertical;
	}

	.char-count {
		font-size: 0.75rem;
		color: #9ca3af;
		text-align: right;
	}

	.modal-error {
		background: #fee;
		border: 1px solid #fcc;
		color: #c33;
		padding: 0.75rem;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.modal-footer {
		display: flex;
		gap: 1rem;
		padding: 1.5rem;
		border-top: 1px solid #e5e7eb;
		justify-content: flex-end;
		background: #f9fafb;
		position: sticky;
		bottom: 0;
	}

	.modal-btn-cancel,
	.modal-btn-add {
		border: none;
		border-radius: 8px;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.modal-btn-cancel {
		background: #e5e7eb;
		color: #374151;
	}

	.modal-btn-cancel:hover:not(:disabled) {
		background: #d1d5db;
	}

	.modal-btn-add {
		background: #3b82f6;
		color: white;
	}

	.modal-btn-add:hover:not(:disabled) {
		background: #2563eb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.modal-btn-add:disabled,
	.modal-btn-cancel:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
