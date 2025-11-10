import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Tareas } from '../../../lib/schemas/index.js';

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

		// Buscar tarea por ID
		const task = await Tareas.findById(id);

		// Si no existe la tarea
		if (!task) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Tarea no encontrada',
					message: `No existe una tarea con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			data: task
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

// Esquema de validación para actualizar tarea
const updateTaskSchema = z.object({
	title: z.string().min(1).max(100).optional(),
	description: z.string().max(500).optional(),
	column: z.string().optional(),
	priority: z.enum(['low', 'medium', 'high']).optional(),
	order: z.number().optional()
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

		// Buscar tarea
		const task = await Tareas.findById(id);
		if (!task) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Tarea no encontrada',
					message: `No existe una tarea con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = updateTaskSchema.parse(body);

		// Actualizar tarea
		if (validatedData.title !== undefined) task.title = validatedData.title;
		if (validatedData.description !== undefined) task.description = validatedData.description;
		if (validatedData.column !== undefined) task.column = validatedData.column;
		if (validatedData.priority !== undefined) task.priority = validatedData.priority;
		if (validatedData.order !== undefined) task.order = validatedData.order;

		// Guardar cambios
		await task.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tarea actualizada exitosamente',
			data: task
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

		// Buscar y eliminar tarea
		const deletedTask = await Tareas.findByIdAndDelete(id);

		if (!deletedTask) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Tarea no encontrada',
					message: `No existe una tarea con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Tarea eliminada exitosamente',
			data: deletedTask
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
