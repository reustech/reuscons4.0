import { z } from 'zod';

// Mock de datos - En producción, esto vendría de MongoDB
const mockUsers = [
	{
		_id: '507f1f77bcf86cd799439011',
		username: 'usuario1',
		email: 'usuario1@example.com',
		password: '$2b$10$hashedpasswordhere',
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
		password: '$2b$10$adminhashedpassword',
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
		password: '$2b$10$moderatorhashedpassword',
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

// Esquema de validación para cambiar contraseña
const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'Contraseña actual es requerida'),
	newPassword: z.string().min(6, 'Nueva contraseña debe tener al menos 6 caracteres'),
	confirmPassword: z.string().min(6, 'Confirmación de contraseña requerida')
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: 'Las contraseñas no coinciden',
	path: ['confirmPassword']
});

// Esquema de validación para el ID
const paramSchema = z.object({
	id: z.string().min(1, 'ID es requerido')
});

// PUT - Cambiar contraseña
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
		const validatedData = changePasswordSchema.parse(body);

		// Obtener usuario
		const user = mockUsers[userIndex];

		// Verificar si la contraseña actual es correcta
		// En producción, usar bcrypt.compare() para verificar
		if (user.password !== validatedData.currentPassword) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Contraseña actual incorrecta',
					message: 'La contraseña actual que ingresaste no es correcta'
				}),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Verificar que la nueva contraseña sea diferente a la actual
		if (validatedData.newPassword === validatedData.currentPassword) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Contraseña igual',
					message: 'La nueva contraseña debe ser diferente a la actual'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Actualizar contraseña (en producción, hashear con bcrypt)
		user.password = validatedData.newPassword;
		mockUsers[userIndex] = user;

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Contraseña actualizada exitosamente'
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
