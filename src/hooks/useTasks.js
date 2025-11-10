import { useState, useEffect, useCallback } from 'react';

export function useTasks(kanbanId, initialTasks = []) {
	const [tasks, setTasks] = useState(initialTasks);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Cargar tareas del API
	const fetchTasks = useCallback(async () => {
		if (!kanbanId) return;
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/tareas?kanban_id=${kanbanId}`);
			const data = await response.json();

			if (response.ok) {
				setTasks(data.data);
			} else {
				setError(data.error || 'Error al cargar las tareas');
			}
		} catch (err) {
			setError('Error de conexión: ' + err.message);
		} finally {
			setLoading(false);
		}
	}, [kanbanId]);

	// Cargar tareas al montar el componente
	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	// Agregar tarea
	const addTask = useCallback(async (columnKey, title, description = '', priority = 'medium', userId = '') => {
		if (!title.trim() || !kanbanId) return null;

		try {
			const response = await fetch('/api/tareas', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title.trim(),
					description: description || null,
					kanban_id: kanbanId,
					column: columnKey,
					priority: priority,
					userId: userId || null,
					order: tasks.filter(t => t.column === columnKey).length + 1
				})
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear la tarea');
				return null;
			}

			setTasks(prev => [...prev, data.data]);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, [kanbanId, tasks]);

	// Eliminar tarea
	const deleteTask = useCallback(async (taskId) => {
		try {
			const response = await fetch(`/api/tareas/${taskId}`, {
				method: 'DELETE'
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al eliminar la tarea');
				return false;
			}

			setTasks(prev => prev.filter(t => t._id !== taskId));
			return true;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return false;
		}
	}, []);

	// Actualizar tarea
	const updateTask = useCallback(async (taskId, updates) => {
		if (!taskId) return null;

		try {
			const response = await fetch(`/api/tareas/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al actualizar la tarea');
				return null;
			}

			setTasks(prev =>
				prev.map(t => t._id === taskId ? data.data : t)
			);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Mover tarea a otra columna
	const moveTask = useCallback(async (taskId, newColumn) => {
		return updateTask(taskId, { column: newColumn });
	}, [updateTask]);

	// Reordenar tarea
	const reorderTask = useCallback(async (taskId, newOrder) => {
		return updateTask(taskId, { order: newOrder });
	}, [updateTask]);

	// Cambiar prioridad
	const updatePriority = useCallback(async (taskId, newPriority) => {
		return updateTask(taskId, { priority: newPriority });
	}, [updateTask]);

	// Obtener tareas por columna
	const getTasksByColumn = useCallback((columnKey) => {
		return tasks.filter(t => t.column === columnKey).sort((a, b) => a.order - b.order);
	}, [tasks]);

	// Obtener tareas por prioridad
	const getTasksByPriority = useCallback((priority) => {
		return tasks.filter(t => t.priority === priority);
	}, [tasks]);

	// Obtener estadísticas
	const getStats = useCallback(() => {
		return {
			total: tasks.length,
			byColumn: {
				todo: tasks.filter(t => t.column === 'todo').length,
				'in-progress': tasks.filter(t => t.column === 'in-progress').length,
				done: tasks.filter(t => t.column === 'done').length
			},
			byPriority: {
				low: tasks.filter(t => t.priority === 'low').length,
				medium: tasks.filter(t => t.priority === 'medium').length,
				high: tasks.filter(t => t.priority === 'high').length
			}
		};
	}, [tasks]);

	// Refrescar tareas desde el servidor
	const refresh = useCallback(() => {
		return fetchTasks();
	}, [fetchTasks]);

	return {
		tasks,
		loading,
		error,
		addTask,
		deleteTask,
		updateTask,
		moveTask,
		reorderTask,
		updatePriority,
		getTasksByColumn,
		getTasksByPriority,
		getStats,
		refresh,
		clearError: () => setError(null)
	};
}
