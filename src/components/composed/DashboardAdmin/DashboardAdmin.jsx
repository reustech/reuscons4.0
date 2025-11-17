import { useState, useEffect } from 'react';
import AdminCard from './AdminCard';
import UsersTable from './UsersTable';

export default function DashboardAdmin() {
	const [activeSection, setActiveSection] = useState(null);
	const [users, setUsers] = useState([]);

	// Cargar usuarios del localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedUsers = localStorage.getItem('users');
			const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];
			setUsers(parsedUsers);
		}
	}, []);

	const handleDeleteUser = (userId) => {
		const updatedUsers = users.filter((u) => u.id !== userId);
		setUsers(updatedUsers);
		localStorage.setItem('users', JSON.stringify(updatedUsers));
	};

	return (
		<div className="dashboard-admin-container">
			{/* Header */}
			<div className="dashboard-header">
				<h1>Dashboard Administrativo</h1>
				<p className="dashboard-subtitle">Gestión general del sistema</p>
			</div>

			{/* Mostrar cards si no hay sección activa */}
			{activeSection === null ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
						gap: 'var(--spacing-md)',
						marginTop: 'var(--spacing-xl)',
					}}
				>
					<AdminCard
						icon="👥"
						title="Gestión de Usuarios"
						description="Crear, editar y eliminar usuarios del sistema. Asignar roles y permisos."
						onClick={() => setActiveSection('users')}
					/>
					<AdminCard
						icon="📋"
						title="Gestión de Boards"
						description="Administrar tableros Kanban. Crear y modificar columnas y configuraciones."
						onClick={() => setActiveSection('boards')}
					/>
					<AdminCard
						icon="🏗️"
						title="Gestión de Obras"
						description="Crear y administrar proyectos. Asignar equipos y seguimiento de proyectos."
						onClick={() => setActiveSection('worksites')}
					/>
					<AdminCard
						icon="✅"
						title="Gestión de Tareas"
						description="Ver y administrar todas las tareas. Cambiar estados y asignaciones."
						onClick={() => setActiveSection('tasks')}
					/>
					<AdminCard
						icon="📎"
						title="Gestión de Archivos"
						description="Administrar archivos del sistema. Ver y eliminar archivos subidos."
						onClick={() => setActiveSection('files')}
					/>
				</div>
			) : (
				// Mostrar sección específica
				<div>
					<button
						className="action-btn secondary"
						onClick={() => setActiveSection(null)}
						style={{ marginBottom: 'var(--spacing-lg)' }}
					>
						← Volver al menú
					</button>

					{activeSection === 'users' && (
						<div className="users-section">
							<h2>Gestión de usuarios</h2>
							<UsersTable users={users} onDeleteUser={handleDeleteUser} />
						</div>
					)}

					{activeSection === 'boards' && (
						<div className="section-placeholder">
							<h2>Gestión de Boards</h2>
							<p>Próximamente...</p>
						</div>
					)}

					{activeSection === 'worksites' && (
						<div className="section-placeholder">
							<h2>Gestión de Obras</h2>
							<p>Próximamente...</p>
						</div>
					)}

					{activeSection === 'tasks' && (
						<div className="section-placeholder">
							<h2>Gestión de Tareas</h2>
							<p>Próximamente...</p>
						</div>
					)}

					{activeSection === 'files' && (
						<div className="section-placeholder">
							<h2>Gestión de Archivos</h2>
							<p>Próximamente...</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
