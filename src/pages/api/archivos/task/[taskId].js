import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../lib/mongodb.js';
import { Archivos } from '../../../../lib/schemas/index.js';

// Esquema de validación para el ID de tarea
const paramSchema = z.object({
	taskId: z.string().min(1, 'ID de tarea es requerido')
});

export const GET = async ({ params }) => {
	try {
		await connectToDatabase();

		// Validar parámetro taskId
		const validatedParams = paramSchema.parse(params);
		const { taskId } = validatedParams;

		// Validar que sea un ObjectId válido
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'ID inválido',
					message: 'El ID de tarea debe ser un ObjectId válido'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Buscar archivos por taskId
		const files = await Archivos.find({ taskId }).sort({ uploadDate: -1 }).lean();

		// Respuesta exitosa
		const response = {
			success: true,
			taskId: taskId,
			totalFiles: files.length,
			data: files
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
