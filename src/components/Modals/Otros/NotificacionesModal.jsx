import React, { useState } from 'react';

export default function NotificacionesModal({ isOpen, onClose }) {
	const [notificaciones, setNotificaciones] = useState({
		tareaAsignada: true,
		tareaCompletada: true,
		usuarioNuevo: true,
		alertasSeguridad: true,
		actualizacionesSistema: true,
		reportesSemanales: false
	});

	const handleToggle = (key) => {
		setNotificaciones(prev => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Notificaciones configuradas:', notificaciones);
		onClose();
	};

	if (!isOpen) return null;

	const opciones = [
		{ key: 'tareaAsignada', label: 'Notificación de tarea asignada', icon: '📋' },
		{ key: 'tareaCompletada', label: 'Notificación de tarea completada', icon: '✓' },
		{ key: 'usuarioNuevo', label: 'Notificación de usuario nuevo', icon: '👤' },
		{ key: 'alertasSeguridad', label: 'Alertas de seguridad', icon: '🔒' },
		{ key: 'actualizacionesSistema', label: 'Actualizaciones del sistema', icon: '⚙️' },
		{ key: 'reportesSemanales', label: 'Reportes semanales', icon: '📊' }
	];

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h2 style={styles.title}>Configurar Notificaciones</h2>
					<button style={styles.closeBtn} onClick={onClose}>✕</button>
				</div>

				<form onSubmit={handleSubmit} style={styles.form}>
					<div style={styles.notificacionesGrid}>
						{opciones.map(opcion => (
							<div key={opcion.key} style={styles.notificacionItem}>
								<label style={styles.itemLabel}>
									<input
										type="checkbox"
										checked={notificaciones[opcion.key]}
										onChange={() => handleToggle(opcion.key)}
										style={styles.checkbox}
									/>
									<span style={styles.icon}>{opcion.icon}</span>
									<span style={styles.labelText}>{opcion.label}</span>
								</label>
							</div>
						))}
					</div>

					<div style={styles.infoBox}>
						<p style={styles.infoText}>
							📧 Las notificaciones se enviarán a tu correo electrónico registrado.
						</p>
					</div>

					<div style={styles.buttonGroup}>
						<button type="submit" style={styles.submitBtn}>
							Guardar Preferencias
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
		maxWidth: '600px',
		width: '90%',
		padding: '2rem',
		animation: 'modalFadeIn 0.3s ease',
		maxHeight: '80vh',
		overflowY: 'auto'
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
	notificacionesGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: '1rem'
	},
	notificacionItem: {
		padding: '1rem',
		backgroundColor: '#f9fafb',
		borderRadius: '8px',
		border: '1px solid #e5e7eb'
	},
	itemLabel: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.75rem',
		cursor: 'pointer',
		fontSize: '0.95rem'
	},
	checkbox: {
		width: '18px',
		height: '18px',
		cursor: 'pointer'
	},
	icon: {
		fontSize: '1.2rem'
	},
	labelText: {
		color: '#1f2937',
		fontWeight: '500'
	},
	infoBox: {
		padding: '1rem',
		backgroundColor: '#eff6ff',
		border: '1px solid #bfdbfe',
		borderRadius: '8px'
	},
	infoText: {
		color: '#1e40af',
		margin: 0,
		fontSize: '0.9rem'
	},
	buttonGroup: {
		display: 'flex',
		gap: '1rem'
	},
	submitBtn: {
		flex: 1,
		padding: '0.75rem 1.5rem',
		backgroundColor: '#667eea',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'background-color 0.2s'
	},
	cancelBtn: {
		flex: 1,
		padding: '0.75rem 1.5rem',
		backgroundColor: '#f3f4f6',
		color: '#1f2937',
		border: 'none',
		borderRadius: '8px',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'background-color 0.2s'
	}
};
