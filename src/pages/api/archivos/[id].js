import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Archivos } from '../../../lib/schemas/index.js';

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

		// Buscar archivo por ID
		const file = await Archivos.findById(id).lean();

		// Si no existe el archivo
		if (!file) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Archivo no encontrado',
					message: `No existe un archivo con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			data: file
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

// Esquema de validación para actualizar archivo
const updateFileSchema = z.object({
	description: z.string().max(500).optional(),
	taskId: z.string().optional(),
	kanbanId: z.string().optional()
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

		// Buscar archivo
		const file = await Archivos.findById(id);
		if (!file) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Archivo no encontrado',
					message: `No existe un archivo con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = updateFileSchema.parse(body);

		// Actualizar archivo
		if (validatedData.description !== undefined) file.description = validatedData.description;
		if (validatedData.taskId !== undefined) file.taskId = validatedData.taskId;
		if (validatedData.kanbanId !== undefined) file.kanbanId = validatedData.kanbanId;

		// Guardar cambios
		await file.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Archivo actualizado exitosamente',
			data: file
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

		// Buscar y eliminar archivo
		const deletedFile = await Archivos.findByIdAndDelete(id);

		if (!deletedFile) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Archivo no encontrado',
					message: `No existe un archivo con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Archivo eliminado exitosamente',
			data: deletedFile
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
