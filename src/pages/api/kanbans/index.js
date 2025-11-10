import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Kanban } from '../../../lib/schemas/index.js';

// Esquema de validación para parámetros de query
const querySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(10).optional(),
	isPublic: z.enum(['true', 'false']).optional()
});

export const GET = async ({ url }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear y validar parámetros de query
		const queryParams = {
			page: url.searchParams.get('page'),
			limit: url.searchParams.get('limit'),
			isPublic: url.searchParams.get('isPublic')
		};

		const validatedParams = querySchema.parse(queryParams);
		const { page = 1, limit = 10, isPublic } = validatedParams;

		// Construir filtro
		const filter = {};
		if (isPublic !== undefined) {
			filter.isPublic = isPublic === 'true';
		}

		// Contar total de kanbans
		const totalKanbans = await Kanban.countDocuments(filter);
		const totalPages = Math.ceil(totalKanbans / limit);

		// Validar página
		if (page > totalPages && totalKanbans > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Página no encontrada',
					message: `La página ${page} excede el total de ${totalPages} páginas`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener kanbans con paginación
		const kanbans = await Kanban.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ createdAt: -1 })
			.lean();

		// Respuesta con metadatos de paginación
		const response = {
			success: true,
			data: kanbans,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalKanbans: totalKanbans,
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

// Esquema de validación para columna
const columnSchema = z.object({
	key: z.string().min(1).max(50),
	title: z.string().min(1).max(50),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color debe ser formato hexadecimal'),
	order: z.number().min(1)
});

// Esquema de validación para crear kanban
const createKanbanSchema = z.object({
	name: z.string().min(1, 'Nombre es requerido').max(100),
	description: z.string().max(500).optional(),
	columns: z.array(columnSchema).min(1, 'Al menos una columna es requerida'),
	isPublic: z.boolean().default(false).optional()
});

export const POST = async ({ request }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = createKanbanSchema.parse(body);

		// Crear nuevo kanban
		const newKanban = new Kanban({
			name: validatedData.name,
			description: validatedData.description || null,
			columns: validatedData.columns,
			isPublic: validatedData.isPublic || false
		});

		// Guardar en MongoDB
		await newKanban.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tablero Kanban creado exitosamente',
			data: newKanban
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
