import React, { useState } from 'react';

export default function AddKanbanModal({
	isOpen,
	onClose,
	onSuccess
}) {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		isPublic: false
	});
	const [columns, setColumns] = useState([
		{ key: 'todo', title: 'Por Hacer', color: '#E8F4F8', order: 1 },
		{ key: 'in-progress', title: 'En Progreso', color: '#FFF4E6', order: 2 },
		{ key: 'done', title: 'Hecho', color: '#E8F8F0', order: 3 }
	]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleColumnChange = (index, field, value) => {
		const newColumns = [...columns];
		newColumns[index][field] = value;
		setColumns(newColumns);
	};

	const addColumn = () => {
		const newColumn = {
			key: `column-${Date.now()}`,
			title: 'Nueva Columna',
			color: '#E8F4F8',
			order: columns.length + 1
		};
		setColumns([...columns, newColumn]);
	};

	const removeColumn = (index) => {
		if (columns.length > 1) {
			const newColumns = columns.filter((_, i) => i !== index);
			setColumns(newColumns);
		} else {
			setError('Debe haber al menos una columna');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		if (columns.length === 0) {
			setError('Debe agregar al menos una columna');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/kanbans', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description || null,
					columns: columns,
					isPublic: formData.isPublic
				})
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear el kanban');
				return;
			}

			setFormData({
				name: '',
				description: '',
				isPublic: false
			});
			setColumns([
				{ key: 'todo', title: 'Por Hacer', color: '#E8F4F8', order: 1 },
				{ key: 'in-progress', title: 'En Progreso', color: '#FFF4E6', order: 2 },
				{ key: 'done', title: 'Hecho', color: '#E8F8F0', order: 3 }
			]);

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
						<h2>Crear Nuevo Kanban</h2>
						<button type="button" className="modal-close" onClick={onClose}>✕</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							{error && <div className="modal-error">{error}</div>}

							<div className="form-group">
								<label htmlFor="name">Nombre *</label>
								<input
									id="name"
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Nombre del kanban"
									required
									maxLength="100"
									className="modal-input"
									autoFocus
								/>
							</div>

							<div className="form-group">
								<label htmlFor="description">Descripción</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Descripción del kanban"
									maxLength="500"
									rows="3"
									className="modal-textarea"
								/>
							</div>

							<div className="checkbox-group">
								<label className="checkbox-label">
									<input
										type="checkbox"
										name="isPublic"
										checked={formData.isPublic}
										onChange={handleInputChange}
									/>
									<span>Kanban público</span>
								</label>
							</div>

							<div className="columns-section">
								<div className="columns-header">
									<h3>Columnas</h3>
									<button
										type="button"
										className="btn-add-column"
										onClick={addColumn}
									>
										+ Agregar Columna
									</button>
								</div>

								<div className="columns-list">
									{columns.map((column, index) => (
										<div key={index} className="column-item">
											<div className="column-input-group">
												<div className="input-wrapper">
													<label>Clave</label>
													<input
														type="text"
														value={column.key}
														onChange={(e) => handleColumnChange(index, 'key', e.target.value)}
														placeholder="unique-key"
														className="column-input small"
													/>
												</div>

												<div className="input-wrapper">
													<label>Título</label>
													<input
														type="text"
														value={column.title}
														onChange={(e) => handleColumnChange(index, 'title', e.target.value)}
														placeholder="Título"
														className="column-input"
													/>
												</div>

												<div className="input-wrapper">
													<label>Color</label>
													<div className="color-input-wrapper">
														<input
															type="color"
															value={column.color}
															onChange={(e) => handleColumnChange(index, 'color', e.target.value)}
															className="column-color-input"
														/>
														<input
															type="text"
															value={column.color}
															onChange={(e) => handleColumnChange(index, 'color', e.target.value)}
															placeholder="#000000"
															className="column-input hex-input"
														/>
													</div>
												</div>

												<div className="input-wrapper">
													<label>Orden</label>
													<input
														type="number"
														value={column.order}
														onChange={(e) => handleColumnChange(index, 'order', parseInt(e.target.value))}
														placeholder="1"
														className="column-input small"
														min="1"
													/>
												</div>

												{columns.length > 1 && (
													<button
														type="button"
														className="btn-remove-column"
														onClick={() => removeColumn(index)}
														title="Eliminar columna"
													>
														🗑️
													</button>
												)}
											</div>
										</div>
									))}
								</div>
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
								disabled={loading || !formData.name}
							>
								{loading ? 'Creando...' : 'Crear Kanban'}
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
		max-width: 700px;
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

	.checkbox-group {
		display: flex;
		align-items: center;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		font-size: 0.95rem;
		color: #374151;
	}

	.checkbox-label input {
		cursor: pointer;
		width: 18px;
		height: 18px;
	}

	.modal-error {
		background: #fee;
		border: 1px solid #fcc;
		color: #c33;
		padding: 0.75rem;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.columns-section {
		border-top: 2px solid #e5e7eb;
		padding-top: 1.5rem;
	}

	.columns-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.columns-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #1f2937;
	}

	.btn-add-column {
		background: #10b981;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-add-column:hover {
		background: #059669;
		transform: translateY(-1px);
	}

	.columns-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.column-item {
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 1rem;
		background: #f9fafb;
	}

	.column-input-group {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		align-items: flex-end;
	}

	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
		min-width: 150px;
	}

	.input-wrapper label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #6b7280;
		text-transform: uppercase;
	}

	.column-input {
		border: 1px solid #d1d5db;
		border-radius: 6px;
		padding: 0.5rem;
		font-size: 0.9rem;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.column-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.column-input.small {
		min-width: 80px;
	}

	.color-input-wrapper {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		width: 100%;
	}

	.column-color-input {
		width: 50px;
		height: 38px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		cursor: pointer;
	}

	.hex-input {
		flex: 1;
		text-transform: uppercase;
	}

	.btn-remove-column {
		background: #ef4444;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
	}

	.btn-remove-column:hover {
		background: #dc2626;
		transform: translateY(-1px);
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
