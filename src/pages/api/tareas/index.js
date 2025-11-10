import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Tareas } from '../../../lib/schemas/index.js';

// Esquema de validación para parámetros de query
const querySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(10).optional(),
	kanban_id: z.string().optional(),
	column: z.string().optional(),
	userId: z.string().optional(),
	priority: z.enum(['low', 'medium', 'high']).optional()
});

export const GET = async ({ url }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear y validar parámetros de query
		const queryParams = {
			page: url.searchParams.get('page'),
			limit: url.searchParams.get('limit'),
			kanban_id: url.searchParams.get('kanban_id'),
			column: url.searchParams.get('column'),
			userId: url.searchParams.get('userId'),
			priority: url.searchParams.get('priority')
		};

		const validatedParams = querySchema.parse(queryParams);
		const { page = 1, limit = 10, kanban_id, column, userId, priority } = validatedParams;

		// Construir filtro
		const filter = {};
		if (kanban_id) filter.kanban_id = kanban_id;
		if (column) filter.column = column;
		if (userId) filter.userId = userId;
		if (priority) filter.priority = priority;

		// Contar total de tareas
		const totalTasks = await Tareas.countDocuments(filter);
		const totalPages = Math.ceil(totalTasks / limit);

		// Validar página
		if (page > totalPages && totalTasks > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Página no encontrada',
					message: `La página ${page} excede el total de ${totalPages} páginas`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener tareas con paginación
		const tasks = await Tareas.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ order: 1 })
			.lean();

		// Respuesta con metadatos de paginación
		const response = {
			success: true,
			data: tasks,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalTasks: totalTasks,
				totalPages: totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1
			}
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

// Esquema de validación para crear tarea
const createTaskSchema = z.object({
	title: z.string().min(1, 'Título es requerido').max(100, 'Título no puede exceder 100 caracteres'),
	description: z.string().max(500, 'Descripción no puede exceder 500 caracteres').optional(),
	kanban_id: z.string().min(1, 'ID del kanban es requerido'),
	userId: z.string().min(1, 'ID del usuario es requerido'),
	column: z.string().default('todo').optional(),
	priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
	order: z.number().default(1).optional()
});

export const POST = async ({ request }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = createTaskSchema.parse(body);

		// Crear nueva tarea
		const newTask = new Tareas({
			title: validatedData.title,
			description: validatedData.description || null,
			kanban_id: validatedData.kanban_id,
			userId: validatedData.userId,
			column: validatedData.column || 'todo',
			priority: validatedData.priority || 'medium',
			order: validatedData.order || 1,
			attachments: []
		});

		// Guardar en MongoDB
		await newTask.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tarea creada exitosamente',
			data: newTask
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
