import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb.js';
import { Obras } from '../../../lib/schemas/index.js';

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

		// Buscar obra por ID
		const work = await Obras.findById(id).lean();

		// Si no existe la obra
		if (!work) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Obra no encontrada',
					message: `No existe una obra con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			data: work
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

// Esquema de validación para actualizar obra
const updateWorkSchema = z.object({
	name: z.string().min(1).max(150).optional(),
	description: z.string().max(1000).optional(),
	location: z.string().min(1).max(150).optional(),
	address: z.string().max(250).optional(),
	client: z.string().min(1).max(150).optional(),
	status: z.enum(['planning', 'in-progress', 'on-hold', 'completed', 'cancelled']).optional(),
	priority: z.enum(['low', 'medium', 'high']).optional(),
	notes: z.string().max(500).optional(),
	admin: z.array(z.string()).optional(),
	team: z.array(z.string()).optional(),
	kanban_id: z.string().optional()
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

		// Buscar obra
		const work = await Obras.findById(id);
		if (!work) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Obra no encontrada',
					message: `No existe una obra con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parsear body del request
		const body = await request.json();

		// Validar datos con Zod
		const validatedData = updateWorkSchema.parse(body);

		// Actualizar obra
		if (validatedData.name !== undefined) work.name = validatedData.name;
		if (validatedData.description !== undefined) work.description = validatedData.description;
		if (validatedData.location !== undefined) work.location = validatedData.location;
		if (validatedData.address !== undefined) work.address = validatedData.address;
		if (validatedData.client !== undefined) work.client = validatedData.client;
		if (validatedData.status !== undefined) work.status = validatedData.status;
		if (validatedData.priority !== undefined) work.priority = validatedData.priority;
		if (validatedData.notes !== undefined) work.notes = validatedData.notes;
		if (validatedData.admin !== undefined) work.admin = validatedData.admin;
		if (validatedData.team !== undefined) work.team = validatedData.team;
		if (validatedData.kanban_id !== undefined) work.kanban_id = validatedData.kanban_id;

		// Guardar cambios
		await work.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Obra actualizada exitosamente',
			data: work
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

		// Buscar y eliminar obra
		const deletedWork = await Obras.findByIdAndDelete(id);

		if (!deletedWork) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Obra no encontrada',
					message: `No existe una obra con ID: ${id}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Obra eliminada exitosamente',
			data: deletedWork
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
