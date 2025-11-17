import { useState } from 'react';

export default function UsersTable({ users, onDeleteUser }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);

	const filteredUsers = users.filter(
		(user) =>
			user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="users-table-wrapper">
			{/* Barra de búsqueda */}
			<div className="table-toolbar">
				<input
					type="text"
					placeholder="Buscar por usuario, email o rol..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input-table"
				/>
				<span className="results-count">
					{filteredUsers.length} de {users.length} usuarios
				</span>
			</div>

			{/* Tabla */}
			{filteredUsers.length > 0 ? (
				<table className="users-table">
					<thead>
						<tr>
							<th>Usuario</th>
							<th>Email</th>
							<th>Rol</th>
							<th>Estado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<tr key={user.id}>
								<td className="user-name-cell">
									<div className="user-avatar">{user.username?.charAt(0).toUpperCase()}</div>
									<span>{user.username}</span>
								</td>
								<td>{user.email}</td>
								<td>
									<span className={`role-badge role-${user.role?.toLowerCase()}`}>
										{user.role || 'usuario'}
									</span>
								</td>
								<td>
									<span className="status-badge status-active">Activo</span>
								</td>
								<td className="actions-cell">
									<button
										className="action-btn-small edit-btn"
										onClick={() => setSelectedUser(user)}
										title="Editar"
									>
										✏️
									</button>
									<button
										className="action-btn-small delete-btn"
										onClick={() => onDeleteUser(user.id)}
										title="Eliminar"
									>
										🗑️
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="empty-state-table">
					<p>No hay usuarios para mostrar</p>
				</div>
			)}

			{/* Modal de usuario seleccionado */}
			{selectedUser && (
				<div className="modal-overlay" onClick={() => setSelectedUser(null)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h3>Detalles del usuario</h3>
						<div className="user-details">
							<p>
								<strong>Usuario:</strong> {selectedUser.username}
							</p>
							<p>
								<strong>Email:</strong> {selectedUser.email}
							</p>
							<p>
								<strong>Rol:</strong> {selectedUser.role || 'usuario'}
							</p>
							<p>
								<strong>ID:</strong> {selectedUser.id}
							</p>
						</div>
						<button
							className="modal-close-btn"
							onClick={() => setSelectedUser(null)}
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
