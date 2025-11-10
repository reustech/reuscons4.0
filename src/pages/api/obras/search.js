import { z } from 'zod';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Obras } from '../../../lib/schemas/index.js';

// Esquema de validación para búsqueda
const searchSchema = z.object({
	q: z.string().min(1, 'Query es requerido'),
	type: z.enum(['name', 'client', 'all']).optional()
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

		if (type === 'name') {
			filter = { name: { $regex: q, $options: 'i' } };
		} else if (type === 'client') {
			filter = { client: { $regex: q, $options: 'i' } };
		} else {
			// Búsqueda en todos los campos (name, client, location o description)
			filter = {
				$or: [
					{ name: { $regex: q, $options: 'i' } },
					{ client: { $regex: q, $options: 'i' } },
					{ location: { $regex: q, $options: 'i' } },
					{ description: { $regex: q, $options: 'i' } }
				]
			};
		}

		// Buscar obras en MongoDB
		const results = await Obras.find(filter).sort({ createdAt: -1 }).lean();

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
