// Mock de datos - En producción, esto vendría de MongoDB
const mockUsers = [
	{
		_id: '507f1f77bcf86cd799439011',
		username: 'usuario1',
		email: 'usuario1@example.com',
		role: 'user',
		lastLogin: '2024-01-15T10:30:00Z',
		profile: {
			firstName: 'Juan',
			lastName: 'Pérez',
			email: 'juan.perez@reustech.com',
			telefono: '+34 912 345 678',
			company: 'Reustech',
			location: 'Barcelona',
			website: 'https://example.com'
		}
	},
	{
		_id: '507f1f77bcf86cd799439012',
		username: 'admin1',
		email: 'admin@example.com',
		role: 'admin',
		lastLogin: '2024-01-16T14:20:00Z',
		profile: {
			firstName: 'María',
			lastName: 'García',
			email: 'maria.garcia@reustech.com',
			telefono: '+34 912 345 679',
			company: 'Reustech',
			location: 'Madrid',
			website: 'https://example.com'
		}
	},
	{
		_id: '507f1f77bcf86cd799439013',
		username: 'moderator1',
		email: 'moderator@example.com',
		role: 'moderator',
		lastLogin: '2024-01-14T09:15:00Z',
		profile: {
			firstName: 'Carlos',
			lastName: 'López',
			email: 'carlos.lopez@reustech.com',
			telefono: '+34 912 345 680',
			company: 'Reustech',
			location: 'Valencia',
			website: 'https://example.com'
		}
	}
];

// GET - Obtener estadísticas de usuarios
export const GET = async ({ request }) => {
	try {
		// En producción, verificar que el usuario sea admin
		// const user = await authenticateUser(request);
		// if (user.role !== 'admin') {
		//   return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });
		// }

		// Calcular estadísticas
		const totalUsers = mockUsers.length;
		const totalAdmins = mockUsers.filter(u => u.role === 'admin').length;
		const totalModerators = mockUsers.filter(u => u.role === 'moderator').length;
		const totalRegularUsers = mockUsers.filter(u => u.role === 'user').length;

		// Calcular usuarios nuevos este mes
		const now = new Date();
		const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const newUsersThisMonth = mockUsers.filter(u => {
			// En producción, comparar con fecha de creación real
			return true; // Mock: asumir que todos son nuevos
		}).length;

		// Obtener usuario con último acceso más reciente
		const lastActiveUser = mockUsers.reduce((prev, current) => {
			const prevDate = new Date(prev.lastLogin || 0);
			const currDate = new Date(current.lastLogin || 0);
			return currDate > prevDate ? current : prev;
		});

		// Agrupar por rol
		const usersByRole = {
			admin: totalAdmins,
			moderator: totalModerators,
			user: totalRegularUsers
		};

		// Respuesta con estadísticas
		const response = {
			success: true,
			timestamp: new Date().toISOString(),
			stats: {
				totalUsers: totalUsers,
				totalAdmins: totalAdmins,
				totalModerators: totalModerators,
				totalRegularUsers: totalRegularUsers,
				newUsersThisMonth: newUsersThisMonth,
				usersByRole: usersByRole,
				lastActiveUser: {
					_id: lastActiveUser._id,
					username: lastActiveUser.username,
					lastLogin: lastActiveUser.lastLogin
				}
			}
		};

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// Error del servidor
		return new Response(
			JSON.stringify({
				success: false,
				error: 'Error interno del servidor',
				message: error instanceof Error ? error.message : 'Unknown error'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
