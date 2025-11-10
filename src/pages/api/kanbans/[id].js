import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Kanban } from '../../../lib/schemas/index.js';

// Esquema de validación para el ID
const paramSchema = z.object({
	id: z.string().min(1, 'ID es requerido')
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
					message: 'El ID debe ser un ObjectId válido'
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

		// Respuesta exitosa
		const response = {
			success: true,
			data: kanban
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

// Esquema de validación para actualizar kanban
const updateKanbanSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	description: z.string().max(500).optional(),
	isPublic: z.boolean().optional()
});

export const PUT = async ({ params, request }) => {
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
					message: 'El ID debe ser un ObjectId válido'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Buscar kanban
		const kanban = await Kanban.findById(id);
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

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = updateKanbanSchema.parse(body);

		// Actualizar kanban
		if (validatedData.name !== undefined) kanban.name = validatedData.name;
		if (validatedData.description !== undefined) kanban.description = validatedData.description;
		if (validatedData.isPublic !== undefined) kanban.isPublic = validatedData.isPublic;

		// Guardar cambios
		await kanban.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tablero Kanban actualizado exitosamente',
			data: kanban
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

export const DELETE = async ({ params }) => {
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
					message: 'El ID debe ser un ObjectId válido'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Buscar y eliminar kanban
		const deletedKanban = await Kanban.findByIdAndDelete(id);

		if (!deletedKanban) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Kanban no encontrado',
					message: `No existe un tablero Kanban con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tablero Kanban eliminado exitosamente',
			data: deletedKanban
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
