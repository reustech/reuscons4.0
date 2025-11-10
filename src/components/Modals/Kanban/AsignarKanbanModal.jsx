import React, { useState } from 'react';

export default function AsignarKanbanModal({ isOpen, onClose }) {
	const [selectedKanban, setSelectedKanban] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);

	const kanbans = [
		{ id: 1, nombre: 'Proyecto A' },
		{ id: 2, nombre: 'Proyecto B' },
		{ id: 3, nombre: 'Proyecto C' }
	];

	const users = [
		{ id: 1, nombre: 'Juan García' },
		{ id: 2, nombre: 'María López' },
		{ id: 3, nombre: 'Carlos Rodríguez' },
		{ id: 4, nombre: 'Ana Martínez' },
		{ id: 5, nombre: 'Pedro Sánchez' }
	];

	const handleUserToggle = (userId) => {
		setSelectedUsers(prev =>
			prev.includes(userId)
				? prev.filter(id => id !== userId)
				: [...prev, userId]
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Kanban asignado:', {
			kanbanId: selectedKanban,
			usuarios: selectedUsers
		});
		setSelectedKanban('');
		setSelectedUsers([]);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h2 style={styles.title}>Asignar Kanban</h2>
					<button style={styles.closeBtn} onClick={onClose}>✕</button>
				</div>

				<form onSubmit={handleSubmit} style={styles.form}>
					<div style={styles.formGroup}>
						<label style={styles.label}>Seleccionar Kanban:</label>
						<select
							value={selectedKanban}
							onChange={(e) => setSelectedKanban(e.target.value)}
							style={styles.select}
							required
						>
							<option value="">Elige un kanban...</option>
							{kanbans.map(kanban => (
								<option key={kanban.id} value={kanban.id}>
									{kanban.nombre}
								</option>
							))}
						</select>
					</div>

					{selectedKanban && (
						<div style={styles.formGroup}>
							<label style={styles.label}>Asignar a usuarios:</label>
							<div style={styles.usersList}>
								{users.map(user => (
									<label key={user.id} style={styles.userCheckbox}>
										<input
											type="checkbox"
											checked={selectedUsers.includes(user.id)}
											onChange={() => handleUserToggle(user.id)}
											style={styles.checkbox}
										/>
										<span style={styles.userLabel}>{user.nombre}</span>
									</label>
								))}
							</div>
						</div>
					)}

					<div style={styles.buttonGroup}>
						<button
							type="submit"
							style={styles.submitBtn}
							disabled={!selectedKanban || selectedUsers.length === 0}
						>
							Asignar
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
	formGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.75rem'
	},
	label: {
		fontSize: '0.95rem',
		fontWeight: '600',
		color: '#1f2937'
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
	usersList: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.75rem',
		maxHeight: '250px',
		overflowY: 'auto',
		border: '1px solid #e5e7eb',
		borderRadius: '8px',
		padding: '0.75rem'
	},
	userCheckbox: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		cursor: 'pointer',
		padding: '0.5rem',
		borderRadius: '4px',
		transition: 'background-color 0.2s'
	},
	checkbox: {
		cursor: 'pointer',
		width: '18px',
		height: '18px'
	},
	userLabel: {
		fontSize: '0.95rem',
		color: '#374151',
		userSelect: 'none'
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
