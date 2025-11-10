import React, { useState } from 'react';

export default function CrearKanbanModal({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		nombre: '',
		descripcion: '',
		plantilla: 'kanban-basico'
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Kanban creado:', formData);
		setFormData({ nombre: '', descripcion: '', plantilla: 'kanban-basico' });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h2 style={styles.title}>Crear Kanban</h2>
					<button style={styles.closeBtn} onClick={onClose}>✕</button>
				</div>

				<form onSubmit={handleSubmit} style={styles.form}>
					<div style={styles.formGroup}>
						<label style={styles.label}>Nombre del Kanban:</label>
						<input
							type="text"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							required
							style={styles.input}
							placeholder="Ej: Nuevo Proyecto"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Descripción:</label>
						<textarea
							name="descripcion"
							value={formData.descripcion}
							onChange={handleChange}
							style={styles.textarea}
							placeholder="Descripción del kanban..."
							rows="4"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Plantilla:</label>
						<select
							name="plantilla"
							value={formData.plantilla}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="kanban-basico">Kanban Básico</option>
							<option value="scrum">Scrum</option>
							<option value="personalizacion">Personalizado</option>
						</select>
					</div>

					<div style={styles.buttonGroup}>
						<button type="submit" style={styles.submitBtn}>
							Crear Kanban
						</button>
						<button type="button" style={styles.cancelBtn} onClick={onClose}>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const styles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1000
	},
	modal: {
		backgroundColor: 'white',
		borderRadius: '12px',
		boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
		maxWidth: '500px',
		width: '90%',
		padding: '2rem',
		animation: 'modalFadeIn 0.3s ease'
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '1.5rem',
		borderBottom: '2px solid #f3f4f6',
		paddingBottom: '1rem'
	},
	title: {
		fontSize: '1.5rem',
		color: '#1f2937',
		margin: 0
	},
	closeBtn: {
		background: 'none',
		border: 'none',
		fontSize: '1.5rem',
		cursor: 'pointer',
		color: '#6b7280',
		transition: 'color 0.2s'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.5rem'
	},
	formGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5rem'
	},
	label: {
		fontSize: '0.95rem',
		fontWeight: '600',
		color: '#1f2937'
	},
	input: {
		padding: '0.75rem',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontFamily: 'inherit'
	},
	textarea: {
		padding: '0.75rem',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontFamily: 'inherit',
		resize: 'vertical'
	},
	select: {
		padding: '0.75rem',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontFamily: 'inherit',
		backgroundColor: 'white',
		cursor: 'pointer'
	},
	buttonGroup: {
		display: 'flex',
		gap: '1rem',
		marginTop: '1rem'
	},
	submitBtn: {
		padding: '0.75rem 1.5rem',
		backgroundColor: '#f093fb',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'background-color 0.2s',
		flex: 1
	},
	cancelBtn: {
		padding: '0.75rem 1.5rem',
		backgroundColor: '#f3f4f6',
		color: '#1f2937',
		border: 'none',
		borderRadius: '8px',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'background-color 0.2s',
		flex: 1
	}
};
