import React, { useState } from 'react';

export default function ReportesModal({ isOpen, onClose }) {
	const [tipoReporte, setTipoReporte] = useState('actividad');
	const [reportes] = useState([
		{ id: 1, nombre: 'Actividad del Sistema', fecha: '2024-11-10', estado: 'disponible' },
		{ id: 2, nombre: 'Desempeño de Usuarios', fecha: '2024-11-10', estado: 'disponible' },
		{ id: 3, nombre: 'Tareas Completadas', fecha: '2024-11-09', estado: 'disponible' },
		{ id: 4, nombre: 'Errores del Sistema', fecha: '2024-11-08', estado: 'disponible' }
	]);

	if (!isOpen) return null;

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h2 style={styles.title}>Reportes</h2>
					<button style={styles.closeBtn} onClick={onClose}>✕</button>
				</div>

				<div style={styles.content}>
					<div style={styles.filterGroup}>
						<label style={styles.label}>Tipo de Reporte:</label>
						<select
							value={tipoReporte}
							onChange={(e) => setTipoReporte(e.target.value)}
							style={styles.select}
						>
							<option value="actividad">Actividad</option>
							<option value="desempeño">Desempeño</option>
							<option value="errores">Errores</option>
						</select>
					</div>

					<div style={styles.reportesList}>
						{reportes.map(reporte => (
							<div key={reporte.id} style={styles.reporteItem}>
								<div style={styles.reporteInfo}>
									<h3 style={styles.reporteName}>{reporte.nombre}</h3>
									<p style={styles.reporteDate}>Generado: {reporte.fecha}</p>
								</div>
								<div style={styles.reporteActions}>
									<button style={styles.viewBtn}>Ver</button>
									<button style={styles.downloadBtn}>Descargar</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div style={styles.buttonGroup}>
					<button style={styles.generateBtn} onClick={() => console.log('Generar nuevo reporte')}>
						Generar Nuevo Reporte
					</button>
					<button style={styles.closeBtn2} onClick={onClose}>
						Cerrar
					</button>
				</div>
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
	content: {
		marginBottom: '1.5rem'
	},
	filterGroup: {
		marginBottom: '1.5rem'
	},
	label: {
		fontSize: '0.95rem',
		fontWeight: '600',
		color: '#1f2937',
		display: 'block',
		marginBottom: '0.5rem'
	},
	select: {
		width: '100%',
		padding: '0.75rem',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontFamily: 'inherit',
		backgroundColor: 'white',
		cursor: 'pointer'
	},
	reportesList: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem'
	},
	reporteItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1rem',
		backgroundColor: '#f9fafb',
		borderRadius: '8px',
		border: '1px solid #e5e7eb'
	},
	reporteInfo: {
		flex: 1
	},
	reporteName: {
		fontSize: '1rem',
		color: '#1f2937',
		margin: 0,
		marginBottom: '0.25rem',
		fontWeight: '600'
	},
	reporteDate: {
		fontSize: '0.85rem',
		color: '#6b7280',
		margin: 0
	},
	reporteActions: {
		display: 'flex',
		gap: '0.5rem'
	},
	viewBtn: {
		padding: '0.5rem 1rem',
		backgroundColor: '#667eea',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		cursor: 'pointer',
		fontSize: '0.85rem',
		fontWeight: '600',
		transition: 'background-color 0.2s'
	},
	downloadBtn: {
		padding: '0.5rem 1rem',
		backgroundColor: '#f3f4f6',
		color: '#1f2937',
		border: '1px solid #d1d5db',
		borderRadius: '6px',
		cursor: 'pointer',
		fontSize: '0.85rem',
		fontWeight: '600',
		transition: 'background-color 0.2s'
	},
	buttonGroup: {
		display: 'flex',
		gap: '1rem'
	},
	generateBtn: {
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
	closeBtn2: {
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
