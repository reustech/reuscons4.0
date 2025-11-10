import { z } from 'zod';

// Esquema de validación para parámetros de query
const querySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(10).optional(),
	role: z.enum(['user', 'admin', 'moderator']).optional()
});

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

export const GET = async ({ url }) => {
	try {
		// Parsear y validar parámetros de query
		const queryParams = {
			page: url.searchParams.get('page'),
			limit: url.searchParams.get('limit'),
			role: url.searchParams.get('role')
		};

		const validatedParams = querySchema.parse(queryParams);
		const { page = 1, limit = 10, role } = validatedParams;

		// Filtrar usuarios por rol si se especifica
		let filteredUsers = mockUsers;
		if (role) {
			filteredUsers = mockUsers.filter(user => user.role === role);
		}

		// Calcular paginación
		const totalUsers = filteredUsers.length;
		const totalPages = Math.ceil(totalUsers / limit);
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;

		// Validar página
		if (page > totalPages && totalUsers > 0) {
			return new Response(
				JSON.stringify({
					error: 'Página no encontrada',
					message: `La página ${page} excede el total de ${totalPages} páginas`
				}),
				{ status: 400 }
			);
		}

		// Obtener usuarios de la página actual
		const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

		// Remover campos sensibles
		const safeUsers = paginatedUsers.map(user => {
			const { password, ...safeUser } = user;
			return safeUser;
		});

		// Respuesta con metadatos de paginación
		const response = {
			success: true,
			data: safeUsers,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalUsers: totalUsers,
				totalPages: totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1
			}
		};

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		// Manejar errores de validación
		if (error instanceof z.ZodError) {
			return new Response(
				JSON.stringify({
					error: 'Validación fallida',
					details: error.errors
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Error del servidor
		return new Response(
			JSON.stringify({
				error: 'Error interno del servidor',
				message: error instanceof Error ? error.message : 'Unknown error'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

// Esquema de validación para crear usuario
const createUserSchema = z.object({
	username: z.string().min(3, 'Username debe tener al menos 3 caracteres').max(20, 'Username no puede exceder 20 caracteres'),
	email: z.string().email('Email no válido'),
	password: z.string().min(6, 'Password debe tener al menos 6 caracteres'),
	firstName: z.string().min(1, 'Nombre es requerido'),
	lastName: z.string().min(1, 'Apellido es requerido'),
	role: z.enum(['user', 'admin', 'moderator']).default('user').optional(),
	company: z.string().optional(),
	location: z.string().optional(),
	website: z.string().url().optional(),
	telefono: z.string().optional()
});

// POST - Crear usuario
export const POST = async ({ request }) => {
	try {
		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = createUserSchema.parse(body);

		// Verificar si username o email ya existen
		const usernameExists = mockUsers.some(u => u.username === validatedData.username);
		const emailExists = mockUsers.some(u => u.email === validatedData.email);

		if (usernameExists) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Username ya existe',
					message: `El username "${validatedData.username}" ya está registrado`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		if (emailExists) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email ya existe',
					message: `El email "${validatedData.email}" ya está registrado`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Crear nuevo usuario
		const newUser = {
			_id: Date.now().toString(),
			username: validatedData.username,
			email: validatedData.email,
			password: validatedData.password, // En producción, se debe hashear con bcrypt
			role: validatedData.role || 'user',
			lastLogin: null,
			profile: {
				firstName: validatedData.firstName,
				lastName: validatedData.lastName,
				email: validatedData.email || null,
				telefono: validatedData.telefono || null,
				company: validatedData.company || null,
				location: validatedData.location || null,
				website: validatedData.website || null
			}
		};

		// Agregar a la lista de usuarios (en producción, guardar en MongoDB)
		mockUsers.push(newUser);

		// Remover campo sensible (password) de la respuesta
		const { password, ...safeUser } = newUser;

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Usuario creado exitosamente',
			data: safeUser
		};

		return new Response(JSON.stringify(response), {
			status: 201,
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

		// Manejar errores de JSON inválido
		if (error instanceof SyntaxError) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'JSON inválido',
					message: 'El body del request debe ser un JSON válido'
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
