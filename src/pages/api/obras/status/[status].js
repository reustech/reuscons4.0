import { z } from 'zod';
import { connectToDatabase } from '../../../../lib/mongodb.js';
import { Obras } from '../../../../lib/schemas/index.js';

// Esquema de validación para el status
const paramSchema = z.object({
	status: z.enum(['planning', 'in-progress', 'on-hold', 'completed', 'cancelled'])
});

export const GET = async ({ params }) => {
	try {
		await connectToDatabase();

		// Validar parámetro status
		const validatedParams = paramSchema.parse(params);
		const { status } = validatedParams;

		// Buscar obras por status
		const works = await Obras.find({ status }).sort({ createdAt: -1 }).lean();

		// Respuesta exitosa
		const response = {
			success: true,
			status: status,
			totalWorks: works.length,
			data: works
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
