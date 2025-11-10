import { z } from 'zod';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../../lib/mongodb.js';
import { Kanban } from '../../../../../lib/schemas/index.js';

// Esquema de validación para los parámetros
const paramSchema = z.object({
	id: z.string().min(1, 'ID del kanban es requerido'),
	columnKey: z.string().min(1, 'Clave de columna es requerida')
});

// Esquema de validación para crear/actualizar una columna
const columnSchema = z.object({
	key: z.string().min(1, 'Clave de columna es requerida').max(50),
	title: z.string().min(1, 'Título es requerido').max(50),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color debe ser un código hexadecimal válido'),
	order: z.number().int().positive('Orden debe ser un número positivo').optional()
});

// Esquema para actualizar (todos los campos opcionales excepto key)
const updateColumnSchema = z.object({
	title: z.string().min(1).max(50).optional(),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color debe ser un código hexadecimal válido').optional(),
	order: z.number().int().positive().optional()
});

export const POST = async ({ params, request }) => {
	try {
		await connectToDatabase();

		// Validar parámetros
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

		// Validar datos de la nueva columna
		const validatedData = columnSchema.parse(body);

		// Verificar que la clave no exista ya
		if (kanban.columns.some(c => c.key === validatedData.key)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Columna duplicada',
					message: `Ya existe una columna con la clave: ${validatedData.key}`
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Calcular orden si no se proporciona
		const order = validatedData.order || kanban.columns.length + 1;

		// Crear nueva columna
		const newColumn = {
			key: validatedData.key,
			title: validatedData.title,
			color: validatedData.color,
			order: order
		};

		// Agregar columna al kanban
		kanban.columns.push(newColumn);
		await kanban.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Columna agregada exitosamente',
			kanbanId: id,
			data: newColumn
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

export const PUT = async ({ params, request }) => {
	try {
		await connectToDatabase();

		// Validar parámetros
		const validatedParams = paramSchema.parse(params);
		const { id, columnKey } = validatedParams;

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

		// Buscar columna
		const columnIndex = kanban.columns.findIndex(c => c.key === columnKey);
		if (columnIndex === -1) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Columna no encontrada',
					message: `No existe una columna con la clave: ${columnKey}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parsear body del request
		const body = await request.json();

		// Validar datos de actualización
		const validatedData = updateColumnSchema.parse(body);

		// Actualizar columna
		const column = kanban.columns[columnIndex];
		if (validatedData.title !== undefined) column.title = validatedData.title;
		if (validatedData.color !== undefined) column.color = validatedData.color;
		if (validatedData.order !== undefined) column.order = validatedData.order;

		// Guardar cambios
		await kanban.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Columna actualizada exitosamente',
			kanbanId: id,
			data: kanban.columns[columnIndex]
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

		// Validar parámetros
		const validatedParams = paramSchema.parse(params);
		const { id, columnKey } = validatedParams;

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

		// Buscar columna
		const columnIndex = kanban.columns.findIndex(c => c.key === columnKey);
		if (columnIndex === -1) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Columna no encontrada',
					message: `No existe una columna con la clave: ${columnKey}`
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Verificar que no sea la última columna (al menos debe haber 1)
		if (kanban.columns.length === 1) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'No se puede eliminar',
					message: 'Un tablero Kanban debe tener al menos una columna'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener datos de la columna antes de eliminarla
		const deletedColumn = kanban.columns[columnIndex];

		// Eliminar columna
		kanban.columns.splice(columnIndex, 1);
		await kanban.save();

		// Respuesta exitosa
		const response = {
			success: true,
			message: 'Columna eliminada exitosamente',
			kanbanId: id,
			data: deletedColumn
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
