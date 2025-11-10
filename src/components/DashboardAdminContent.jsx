import React, { useState } from 'react';
import CrearUsuarioModal from './Modals/Usuario/CrearUsuarioModal';
import ModificarUsuarioModal from './Modals/Usuario/ModificarUsuarioModal';
import CambiarContrasenaModal from './Modals/Usuario/CambiarContrasenaModal';
import CrearKanbanModal from './Modals/Kanban/CrearKanbanModal';
import ModificarKanbanModal from './Modals/Kanban/ModificarKanbanModal';
import AsignarKanbanModal from './Modals/Kanban/AsignarKanbanModal';
import ConfiguracionGeneralModal from './Modals/Otros/ConfiguracionGeneralModal';
import ReportesModal from './Modals/Otros/ReportesModal';
import NotificacionesModal from './Modals/Otros/NotificacionesModal';

export default function DashboardAdminContent() {
	const [activeModal, setActiveModal] = useState(null);

	const subOptions = {
		1: [
			{ id: 'u1', label: '➕ Crear Usuario', color: 'grid-item-1' },
			{ id: 'u2', label: '✏️ Modificar Usuario', color: 'grid-item-2' },
			{ id: 'u3', label: '🔑 Cambiar Contraseña', color: 'grid-item-3' }
		],
		2: [
			{ id: 'k1', label: '➕ Crear Kanban', color: 'grid-item-1' },
			{ id: 'k2', label: '✏️ Modificar Kanban', color: 'grid-item-2' },
			{ id: 'k3', label: '🔗 Asignar Kanban', color: 'grid-item-3' }
		],
		3: [
			{ id: 'o1', label: '⚙️ Configuración General', color: 'grid-item-1' },
			{ id: 'o2', label: '📊 Reportes', color: 'grid-item-2' },
			{ id: 'o3', label: '🔔 Notificaciones', color: 'grid-item-3' }
		]
	};

	const [col2Items, setCol2Items] = useState([]);
	const [activeSection, setActiveSection] = useState(null);
	const [activeItem, setActiveItem] = useState(null);

	const handleSectionClick = (section) => {
		setCol2Items(subOptions[section]);
		setActiveSection(section);
		setActiveItem(null);
	};

	const handleItemClick = (id) => {
		setActiveItem(id);
		setActiveModal(id);
	};

	const closeModal = () => {
		setActiveModal(null);
	};

	return (
		<div style={styles.container}>
			<div style={styles.grid}>
				{/* Columna 1 */}
				<div style={styles.column}>
					<div
						style={{
							...styles.gridItem,
							...styles.gridItem1,
							backgroundColor: activeSection === 1 ? 'rgba(102, 126, 234, 0.9)' : undefined
						}}
						onClick={() => handleSectionClick(1)}
					>
						Usuarios
					</div>
					<div
						style={{
							...styles.gridItem,
							...styles.gridItem2,
							backgroundColor: activeSection === 2 ? 'rgba(240, 147, 251, 0.9)' : undefined
						}}
						onClick={() => handleSectionClick(2)}
					>
						Kanbans
					</div>
					<div
						style={{
							...styles.gridItem,
							...styles.gridItem3,
							backgroundColor: activeSection === 3 ? 'rgba(79, 172, 254, 0.9)' : undefined
						}}
						onClick={() => handleSectionClick(3)}
					>
						Otros
					</div>
				</div>

				{/* Columna 2 */}
				{col2Items.length > 0 && (
					<div style={styles.column}>
						{col2Items.map(item => (
							<div
								key={item.id}
								style={{
									...styles.gridItem,
									...(item.color === 'grid-item-1' ? styles.gridItem1 :
									   item.color === 'grid-item-2' ? styles.gridItem2 :
									   styles.gridItem3),
									backgroundColor: activeItem === item.id ? 'rgba(102, 126, 234, 0.9)' : undefined,
									cursor: 'pointer'
								}}
								onClick={() => handleItemClick(item.id)}
							>
								{item.label}
							</div>
						))}
					</div>
				)}

				{/* Columna 3 - Solo muestra espacio si hay algo seleccionado */}
				{activeItem && <div style={styles.column} />}
			</div>

			{/* Modales */}
			<CrearUsuarioModal isOpen={activeModal === 'u1'} onClose={closeModal} />
			<ModificarUsuarioModal isOpen={activeModal === 'u2'} onClose={closeModal} />
			<CambiarContrasenaModal isOpen={activeModal === 'u3'} onClose={closeModal} />
			<CrearKanbanModal isOpen={activeModal === 'k1'} onClose={closeModal} />
			<ModificarKanbanModal isOpen={activeModal === 'k2'} onClose={closeModal} />
			<AsignarKanbanModal isOpen={activeModal === 'k3'} onClose={closeModal} />
			<ConfiguracionGeneralModal isOpen={activeModal === 'o1'} onClose={closeModal} />
			<ReportesModal isOpen={activeModal === 'o2'} onClose={closeModal} />
			<NotificacionesModal isOpen={activeModal === 'o3'} onClose={closeModal} />
		</div>
	);
}

const styles = {
	container: {
		width: '100%'
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: '2rem',
		marginTop: '2rem'
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2.5rem'
	},
	gridItem: {
		padding: '2rem',
		borderRadius: '12px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100px',
		fontWeight: '600',
		color: 'white',
		textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		userSelect: 'none'
	},
	gridItem1: {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
	},
	gridItem2: {
		background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
	},
	gridItem3: {
		background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
	}
};
