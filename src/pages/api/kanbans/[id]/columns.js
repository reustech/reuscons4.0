import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../lib/mongodb.js';
import { Kanban } from '../../../../lib/schemas/index.js';

// Esquema de validación para el ID del kanban
const paramSchema = z.object({
	id: z.string().min(1, 'ID del kanban es requerido')
});

export const GET = async ({ params }) => {
	try {
		await connectToDatabase();

		// Validar parámetro ID
		const validatedParams = paramSchema.parse(params);
		const { id } = validatedParams;

		// Validar que sea un ObjectId válido
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'ID inválido',
					message: 'El ID del kanban debe ser un ObjectId válido'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Buscar kanban por ID
		const kanban = await Kanban.findById(id).lean();

		// Si no existe el kanban
		if (!kanban) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Kanban no encontrado',
					message: `No existe un tablero Kanban con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa con las columnas ordenadas
		const sortedColumns = kanban.columns.sort((a, b) => a.order - b.order);
		const response = {
			success: true,
			kanbanId: id,
			totalColumns: kanban.columns.length,
			data: sortedColumns
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
