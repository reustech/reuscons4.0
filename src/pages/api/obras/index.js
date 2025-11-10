import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Obras } from '../../../lib/schemas/index.js';

// Esquema de validación para parámetros de query
const querySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(10).optional(),
	status: z.enum(['planning', 'in-progress', 'on-hold', 'completed', 'cancelled']).optional(),
	client: z.string().optional(),
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
			status: url.searchParams.get('status'),
			client: url.searchParams.get('client'),
			priority: url.searchParams.get('priority')
		};

		const validatedParams = querySchema.parse(queryParams);
		const { page = 1, limit = 10, status, client, priority } = validatedParams;

		// Construir filtro
		const filter = {};
		if (status) filter.status = status;
		if (client) filter.client = { $regex: client, $options: 'i' };
		if (priority) filter.priority = priority;

		// Contar total de obras
		const totalWorks = await Obras.countDocuments(filter);
		const totalPages = Math.ceil(totalWorks / limit);

		// Validar página
		if (page > totalPages && totalWorks > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Página no encontrada',
					message: `La página ${page} excede el total de ${totalPages} páginas`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener obras con paginación
		const works = await Obras.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ createdAt: -1 })
			.lean();

		// Respuesta con metadatos de paginación
		const response = {
			success: true,
			data: works,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalWorks: totalWorks,
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

// Esquema de validación para crear obra
const createWorkSchema = z.object({
	name: z.string().min(1, 'Nombre es requerido').max(150),
	description: z.string().max(1000).optional(),
	location: z.string().min(1, 'Ubicación es requerida').max(150),
	address: z.string().max(250).optional(),
	client: z.string().min(1, 'Cliente es requerido').max(150),
	kanban_id: z.string().optional(),
	admin: z.array(z.string()).default([]),
	team: z.array(z.string()).default([]),
	priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
	notes: z.string().max(500).optional()
});

export const POST = async ({ request }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = createWorkSchema.parse(body);

		// Crear nueva obra
		const newWork = new Obras({
			name: validatedData.name,
			description: validatedData.description || null,
			location: validatedData.location,
			address: validatedData.address || null,
			client: validatedData.client,
			status: 'planning',
			team: validatedData.team || [],
			admin: validatedData.admin || [],
			kanban_id: validatedData.kanban_id || null,
			priority: validatedData.priority || 'medium',
			notes: validatedData.notes || null
		});

		// Guardar en MongoDB
		await newWork.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Obra creada exitosamente',
			data: newWork
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
