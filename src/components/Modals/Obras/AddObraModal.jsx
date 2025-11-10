import React, { useState } from 'react';

export default function AddObraModal({
	isOpen,
	onClose,
	onSuccess
}) {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		location: '',
		address: '',
		client: '',
		priority: 'medium',
		kanban_id: '',
		admin: '',
		team: ''
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
			const response = await fetch('/api/obras', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description || null,
					location: formData.location,
					address: formData.address,
					client: formData.client,
					priority: formData.priority,
					kanban_id: formData.kanban_id || null,
					admin: formData.admin ? [formData.admin] : [],
					team: formData.team ? formData.team.split(',').map(id => id.trim()) : [],
					status: 'planning',
					notes: ''
				})
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear la obra');
				return;
			}

			setFormData({
				name: '',
				description: '',
				location: '',
				address: '',
				client: '',
				priority: 'medium',
				kanban_id: '',
				admin: '',
				team: ''
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
						<h2>Crear Nueva Obra</h2>
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
									placeholder="Nombre de la obra"
									required
									maxLength="100"
									className="modal-input"
									autoFocus
								/>
							</div>

							<div className="form-group">
								<label htmlFor="client">Cliente *</label>
								<input
									id="client"
									type="text"
									name="client"
									value={formData.client}
									onChange={handleInputChange}
									placeholder="Nombre del cliente"
									required
									maxLength="100"
									className="modal-input"
								/>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label htmlFor="location">Ubicación *</label>
									<input
										id="location"
										type="text"
										name="location"
										value={formData.location}
										onChange={handleInputChange}
										placeholder="Ciudad, Región"
										required
										maxLength="100"
										className="modal-input"
									/>
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
								<label htmlFor="address">Dirección *</label>
								<input
									id="address"
									type="text"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									placeholder="Dirección completa"
									required
									maxLength="200"
									className="modal-input"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="description">Descripción</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Descripción de la obra"
									maxLength="500"
									rows="3"
									className="modal-textarea"
								/>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label htmlFor="admin">Admin (ID)</label>
									<input
										id="admin"
										type="text"
										name="admin"
										value={formData.admin}
										onChange={handleInputChange}
										placeholder="ID del administrador"
										className="modal-input"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="team">Equipo (IDs)</label>
									<input
										id="team"
										type="text"
										name="team"
										value={formData.team}
										onChange={handleInputChange}
										placeholder="IDs separados por comas"
										className="modal-input"
									/>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="kanban_id">Kanban ID (opcional)</label>
								<input
									id="kanban_id"
									type="text"
									name="kanban_id"
									value={formData.kanban_id}
									onChange={handleInputChange}
									placeholder="ID del kanban asociado"
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
								disabled={loading || !formData.name || !formData.client || !formData.location || !formData.address}
							>
								{loading ? 'Creando...' : 'Crear Obra'}
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
