import { connectToDatabase } from '../../../lib/mongodb.js';
import { Tareas } from '../../../lib/schemas/index.js';

export const GET = async () => {
	try {
		// Conectar a base de datos
		await connectToDatabase();

		// Obtener todas las tareas
		const allTasks = await Tareas.find({}).lean();

		// Total de tareas
		const totalTasks = allTasks.length;

		// Calcular estadísticas por columna
		const tasksByColumn = {
			todo: allTasks.filter(t => t.column === 'todo').length,
			'in-progress': allTasks.filter(t => t.column === 'in-progress').length,
			done: allTasks.filter(t => t.column === 'done').length
		};

		// Calcular estadísticas por prioridad
		const tasksByPriority = {
			low: allTasks.filter(t => t.priority === 'low').length,
			medium: allTasks.filter(t => t.priority === 'medium').length,
			high: allTasks.filter(t => t.priority === 'high').length
		};

		// Tarea más reciente (última en la lista)
		const lastTask = allTasks.length > 0 ? allTasks[allTasks.length - 1] : null;

		// Respuesta con estadísticas
		const response = {
			success: true,
			timestamp: new Date().toISOString(),
			stats: {
				totalTasks: totalTasks,
				tasksByColumn: tasksByColumn,
				tasksByPriority: tasksByPriority,
				lastTask: lastTask ? {
					_id: lastTask._id,
					title: lastTask.title,
					column: lastTask.column,
					priority: lastTask.priority
				} : null
			}
		};

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
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
