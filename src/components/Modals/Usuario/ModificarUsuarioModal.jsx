import React, { useState } from 'react';

export default function ModificarUsuarioModal({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		usuario: '',
		nombre: '',
		email: '',
		estado: 'activo'
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
		console.log('Usuario modificado:', formData);
		setFormData({ usuario: '', nombre: '', email: '', estado: 'activo' });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h2 style={styles.title}>Modificar Usuario</h2>
					<button style={styles.closeBtn} onClick={onClose}>✕</button>
				</div>

				<form onSubmit={handleSubmit} style={styles.form}>
					<div style={styles.formGroup}>
						<label style={styles.label}>Seleccionar Usuario:</label>
						<select
							name="usuario"
							value={formData.usuario}
							onChange={handleChange}
							required
							style={styles.select}
						>
							<option value="">-- Selecciona un usuario --</option>
							<option value="user1">Juan García</option>
							<option value="user2">María López</option>
							<option value="user3">Carlos Rodríguez</option>
						</select>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Nombre:</label>
						<input
							type="text"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							style={styles.input}
							placeholder="Nuevo nombre"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Email:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							style={styles.input}
							placeholder="nuevo@email.com"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Estado:</label>
						<select
							name="estado"
							value={formData.estado}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="activo">Activo</option>
							<option value="inactivo">Inactivo</option>
							<option value="suspendido">Suspendido</option>
						</select>
					</div>

					<div style={styles.buttonGroup}>
						<button type="submit" style={styles.submitBtn}>
							Guardar Cambios
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
