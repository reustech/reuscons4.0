import { useState, useCallback } from 'react';

export function useArchivos() {
	const [archivos, setArchivos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Cargar archivos
	const fetchArchivos = useCallback(async (filters = {}) => {
		setLoading(true);
		setError(null);

		try {
			const queryParams = new URLSearchParams();
			if (filters.page) queryParams.append('page', filters.page);
			if (filters.limit) queryParams.append('limit', filters.limit);

			const url = `/api/archivos${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
			const response = await fetch(url);
			const data = await response.json();

			if (response.ok) {
				setArchivos(data.data);
			} else {
				setError(data.error || 'Error al cargar los archivos');
			}
		} catch (err) {
			setError('Error de conexión: ' + err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Crear archivo (upload)
	const addArchivo = useCallback(async (formData) => {
		try {
			const response = await fetch('/api/archivos', {
				method: 'POST',
				body: formData // FormData, no JSON
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al subir el archivo');
				return null;
			}

			setArchivos(prev => [...prev, data.data]);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Obtener archivo por ID
	const getArchivo = useCallback(async (archivoId) => {
		try {
			const response = await fetch(`/api/archivos/${archivoId}`);
			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al obtener el archivo');
				return null;
			}

			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Actualizar archivo
	const updateArchivo = useCallback(async (archivoId, updates) => {
		try {
			const response = await fetch(`/api/archivos/${archivoId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al actualizar el archivo');
				return null;
			}

			setArchivos(prev =>
				prev.map(a => a._id === archivoId ? data.data : a)
			);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Eliminar archivo
	const deleteArchivo = useCallback(async (archivoId) => {
		try {
			const response = await fetch(`/api/archivos/${archivoId}`, {
				method: 'DELETE'
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al eliminar el archivo');
				return false;
			}

			setArchivos(prev => prev.filter(a => a._id !== archivoId));
			return true;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return false;
		}
	}, []);

	// Buscar archivos
	const searchArchivos = useCallback(async (query) => {
		try {
			const response = await fetch(`/api/archivos/search?q=${encodeURIComponent(query)}`);
			const data = await response.json();

			if (response.ok) {
				return data.data;
			}
			return [];
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return [];
		}
	}, []);

	// Obtener archivos por tarea
	const getArchivosByTask = useCallback(async (taskId) => {
		try {
			const response = await fetch(`/api/archivos/task/${taskId}`);
			const data = await response.json();

			if (response.ok) {
				return data.data;
			}
			return [];
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return [];
		}
	}, []);

	// Obtener archivos por kanban
	const getArchivosByKanban = useCallback(async (kanbanId) => {
		try {
			const response = await fetch(`/api/archivos/kanban/${kanbanId}`);
			const data = await response.json();

			if (response.ok) {
				return data.data;
			}
			return [];
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return [];
		}
	}, []);

	// Obtener archivos por usuario
	const getArchivosByUser = useCallback(async (userId) => {
		try {
			const response = await fetch(`/api/archivos/user/${userId}`);
			const data = await response.json();

			if (response.ok) {
				return data.data;
			}
			return [];
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return [];
		}
	}, []);

	return {
		archivos,
		loading,
		error,
		addArchivo,
		getArchivo,
		updateArchivo,
		deleteArchivo,
		searchArchivos,
		getArchivosByTask,
		getArchivosByKanban,
		getArchivosByUser,
		refresh: fetchArchivos,
		clearError: () => setError(null)
	};
}
