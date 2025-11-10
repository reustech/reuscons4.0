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

// Esquema de validación para el ID
const paramSchema = z.object({
	id: z.string().min(1, 'ID es requerido')
});

export const GET = async ({ params }) => {
	try {
		// Validar parámetro ID
		const validatedParams = paramSchema.parse(params);
		const { id } = validatedParams;

		// Buscar usuario por ID
		const user = mockUsers.find(u => u._id === id);

		// Si no existe el usuario
		if (!user) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Usuario no encontrado',
					message: `No existe un usuario con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Remover campo sensible (password)
		const { password, ...safeUser } = user;

		// Respuesta exitosa
		const response = {
			success: true,
			data: safeUser
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

// Esquema de validación para actualizar usuario
const updateUserSchema = z.object({
	username: z.string().min(3).max(20).optional(),
	email: z.string().email().optional(),
	firstName: z.string().min(1).optional(),
	lastName: z.string().min(1).optional(),
	role: z.enum(['user', 'admin', 'moderator']).optional(),
	company: z.string().optional(),
	location: z.string().optional(),
	website: z.string().url().optional(),
	telefono: z.string().optional()
});

// PUT - Actualizar usuario
export const PUT = async ({ params, request }) => {
	try {
		// Validar parámetro ID
		const validatedParams = paramSchema.parse(params);
		const { id } = validatedParams;

		// Buscar usuario
		const userIndex = mockUsers.findIndex(u => u._id === id);
		if (userIndex === -1) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Usuario no encontrado',
					message: `No existe un usuario con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = updateUserSchema.parse(body);

		// Verificar si el nuevo username o email ya existen en otros usuarios
		if (validatedData.username) {
			const usernameExists = mockUsers.some(u => u.username === validatedData.username && u._id !== id);
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
		}

		if (validatedData.email) {
			const emailExists = mockUsers.some(u => u.email === validatedData.email && u._id !== id);
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
		}

		// Actualizar usuario
		const user = mockUsers[userIndex];
		const updatedUser = {
			...user,
			username: validatedData.username || user.username,
			email: validatedData.email || user.email,
			role: validatedData.role || user.role,
			profile: {
				...user.profile,
				firstName: validatedData.firstName || user.profile.firstName,
				lastName: validatedData.lastName || user.profile.lastName,
				email: validatedData.email || user.profile.email,
				telefono: validatedData.telefono !== undefined ? validatedData.telefono : user.profile.telefono,
				company: validatedData.company !== undefined ? validatedData.company : user.profile.company,
				location: validatedData.location !== undefined ? validatedData.location : user.profile.location,
				website: validatedData.website !== undefined ? validatedData.website : user.profile.website
			}
		};

		// Guardar cambios (en producción, guardar en MongoDB)
		mockUsers[userIndex] = updatedUser;

		// Remover campo sensible (password)
		const { password, ...safeUser } = updatedUser;

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Usuario actualizado exitosamente',
			data: safeUser
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

// DELETE - Eliminar usuario
export const DELETE = async ({ params }) => {
	try {
		// Validar parámetro ID
		const validatedParams = paramSchema.parse(params);
		const { id } = validatedParams;

		// Buscar usuario
		const userIndex = mockUsers.findIndex(u => u._id === id);
		if (userIndex === -1) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Usuario no encontrado',
					message: `No existe un usuario con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener datos del usuario antes de eliminarlo
		const deletedUser = mockUsers[userIndex];

		// Eliminar usuario del array (en producción, eliminar de MongoDB)
		mockUsers.splice(userIndex, 1);

		// Remover campo sensible (password) de la respuesta
		const { password, ...safeUser } = deletedUser;

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Usuario eliminado exitosamente',
			data: safeUser
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
