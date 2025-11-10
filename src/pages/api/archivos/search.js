import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Archivos } from '../../../lib/schemas/index.js';

// Esquema de validación para búsqueda
const searchSchema = z.object({
	q: z.string().min(1, 'Query es requerido'),
	type: z.enum(['filename', 'description', 'all']).optional()
});

export const GET = async ({ url }) => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Obtener parámetros de query
		const query = url.searchParams.get('q');
		const searchType = url.searchParams.get('type');

		// Validar parámetros
		const validatedParams = searchSchema.parse({ q: query, type: searchType });
		const { q, type } = validatedParams;

		// Construir filtro de búsqueda con regex para búsqueda case-insensitive
		let filter = {};

		if (type === 'filename') {
			filter = {
				$or: [
					{ filename: { $regex: q, $options: 'i' } },
					{ originalName: { $regex: q, $options: 'i' } }
				]
			};
		} else if (type === 'description') {
			filter = { description: { $regex: q, $options: 'i' } };
		} else {
			// Búsqueda en todos los campos (filename, originalName o description)
			filter = {
				$or: [
					{ filename: { $regex: q, $options: 'i' } },
					{ originalName: { $regex: q, $options: 'i' } },
					{ description: { $regex: q, $options: 'i' } }
				]
			};
		}

		// Buscar archivos en MongoDB
		const results = await Archivos.find(filter).sort({ uploadDate: -1 }).lean();

		// Respuesta
		const response = {
			success: true,
			query: q,
			searchType: type || 'all',
			totalResults: results.length,
			data: results
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
