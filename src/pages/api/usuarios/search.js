import { z } from 'zod';

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

// Esquema de validación para búsqueda
const searchSchema = z.object({
	q: z.string().min(1, 'Query es requerido'),
	type: z.enum(['username', 'email', 'name']).optional()
});

// GET - Buscar usuarios
export const GET = async ({ url }) => {
	try {
		// Obtener parámetros de query
		const query = url.searchParams.get('q');
		const searchType = url.searchParams.get('type');

		// Validar parámetros
		const validatedParams = searchSchema.parse({ q: query, type: searchType });
		const { q, type } = validatedParams;

		// Normalizar query para búsqueda
		const lowerQuery = q.toLowerCase();

		// Realizar búsqueda según tipo
		let results = [];

		if (type === 'username') {
			results = mockUsers.filter(u => u.username.toLowerCase().includes(lowerQuery));
		} else if (type === 'email') {
			results = mockUsers.filter(u => u.email.toLowerCase().includes(lowerQuery) || u.profile.email.toLowerCase().includes(lowerQuery));
		} else if (type === 'name') {
			results = mockUsers.filter(u =>
				u.profile.firstName.toLowerCase().includes(lowerQuery) ||
				u.profile.lastName.toLowerCase().includes(lowerQuery)
			);
		} else {
			// Búsqueda en todos los campos
			results = mockUsers.filter(u =>
				u.username.toLowerCase().includes(lowerQuery) ||
				u.email.toLowerCase().includes(lowerQuery) ||
				u.profile.email.toLowerCase().includes(lowerQuery) ||
				u.profile.firstName.toLowerCase().includes(lowerQuery) ||
				u.profile.lastName.toLowerCase().includes(lowerQuery)
			);
		}

		// Remover campos sensibles
		const safeResults = results.map(user => {
			const { password, ...safeUser } = user;
			return safeUser;
		});

		// Respuesta
		const response = {
			success: true,
			query: q,
			searchType: type || 'all',
			totalResults: safeResults.length,
			data: safeResults
		};

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// Manejar errores de validación
		if (error instanceof z.ZodError) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Validación fallida',
					details: error.errors
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

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
