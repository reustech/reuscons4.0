import React, { useState } from 'react';

export default function AddTareaModal({
	isOpen,
	kanbanId,
	columns,
	onClose,
	onSuccess
}) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		column: columns[0]?.key || 'todo',
		priority: 'medium',
		userId: ''
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await fetch('/api/tareas', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: formData.title,
					description: formData.description || null,
					kanban_id: kanbanId,
					column: formData.column,
					priority: formData.priority,
					userId: formData.userId || null,
					order: 1
				})
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear la tarea');
				return;
			}

			setFormData({
				title: '',
				description: '',
				column: columns[0]?.key || 'todo',
				priority: 'medium',
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

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<style>{styles}</style>
			<div className="modal-overlay" onClick={onClose}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-header">
						<h2>Crear Nueva Tarea</h2>
						<button className="modal-close" onClick={onClose}>✕</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							{error && <div className="modal-error">{error}</div>}

							<div className="form-group">
								<label htmlFor="title">Título *</label>
								<input
									id="title"
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									onKeyDown={handleKeyDown}
									placeholder="Título de la tarea"
									required
									maxLength="100"
									className="modal-input"
									autoFocus
								/>
								<span className="char-count">{formData.title.length}/100</span>
							</div>

							<div className="form-group">
								<label htmlFor="description">Descripción</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Descripción de la tarea"
									maxLength="500"
									rows="4"
									className="modal-textarea"
								/>
								<span className="char-count">{formData.description.length}/500</span>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label htmlFor="column">Columna</label>
									<select
										id="column"
										name="column"
										value={formData.column}
										onChange={handleInputChange}
										className="modal-select"
									>
										{columns.map(col => (
											<option key={col.key} value={col.key}>
												{col.title}
											</option>
										))}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="priority">Prioridad</label>
									<select
										id="priority"
										name="priority"
										value={formData.priority}
										onChange={handleInputChange}
										className="modal-select"
									>
										<option value="low">Baja</option>
										<option value="medium">Media</option>
										<option value="high">Alta</option>
									</select>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="userId">Usuario Asignado (ID)</label>
								<input
									id="userId"
									type="text"
									name="userId"
									value={formData.userId}
									onChange={handleInputChange}
									placeholder="ID del usuario (opcional)"
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
								disabled={loading || !formData.title}
							>
								{loading ? 'Creando...' : 'Crear Tarea'}
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
		max-width: 600px;
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

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.modal-input,
	.modal-textarea,
	.modal-select {
		border: 1px solid #d1d5db;
		border-radius: 8px;
		padding: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.modal-input:focus,
	.modal-textarea:focus,
	.modal-select:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.modal-textarea {
		resize: vertical;
		min-height: 100px;
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
