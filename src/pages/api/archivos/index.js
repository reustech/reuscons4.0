import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Archivos } from '../../../lib/schemas/index.js';

// Esquema de validación para parámetros de query
const querySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(10).optional(),
	userId: z.string().optional(),
	kanbanId: z.string().optional(),
	taskId: z.string().optional()
});

export const GET = async ({ url }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear y validar parámetros de query
		const queryParams = {
			page: url.searchParams.get('page'),
			limit: url.searchParams.get('limit'),
			userId: url.searchParams.get('userId'),
			kanbanId: url.searchParams.get('kanbanId'),
			taskId: url.searchParams.get('taskId')
		};

		const validatedParams = querySchema.parse(queryParams);
		const { page = 1, limit = 10, userId, kanbanId, taskId } = validatedParams;

		// Construir filtro
		const filter = {};
		if (userId) filter.userId = userId;
		if (kanbanId) filter.kanbanId = kanbanId;
		if (taskId) filter.taskId = taskId;

		// Contar total de archivos
		const totalFiles = await Archivos.countDocuments(filter);
		const totalPages = Math.ceil(totalFiles / limit);

		// Validar página
		if (page > totalPages && totalFiles > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Página no encontrada',
					message: `La página ${page} excede el total de ${totalPages} páginas`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener archivos con paginación
		const files = await Archivos.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ uploadDate: -1 })
			.lean();

		// Respuesta con metadatos de paginación
		const response = {
			success: true,
			data: files,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalFiles: totalFiles,
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

// Esquema de validación para crear archivo
const createFileSchema = z.object({
	filename: z.string().min(1, 'Nombre del archivo es requerido').max(255),
	originalName: z.string().min(1, 'Nombre original es requerido').max(255),
	mimetype: z.string().min(1, 'Tipo MIME es requerido').max(100),
	size: z.number().min(1, 'Tamaño debe ser mayor a 0'),
	userId: z.string().min(1, 'ID del usuario es requerido'),
	kanbanId: z.string().optional(),
	taskId: z.string().optional(),
	description: z.string().max(500).optional()
});

export const POST = async ({ request }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = createFileSchema.parse(body);

		// Crear nuevo archivo
		const newFile = new Archivos({
			filename: validatedData.filename,
			originalName: validatedData.originalName,
			mimetype: validatedData.mimetype,
			size: validatedData.size,
			userId: validatedData.userId,
			kanbanId: validatedData.kanbanId || null,
			taskId: validatedData.taskId || null,
			description: validatedData.description || null
		});

		// Guardar en MongoDB
		await newFile.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Archivo creado exitosamente',
			data: newFile
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
