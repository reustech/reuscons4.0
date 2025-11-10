import { useState, useEffect, useCallback } from 'react';

export function useKanbans() {
	const [kanbans, setKanbans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Cargar kanbans del API
	const fetchKanbans = useCallback(async (filters = {}) => {
		setLoading(true);
		setError(null);

		try {
			const queryParams = new URLSearchParams();
			if (filters.page) queryParams.append('page', filters.page);
			if (filters.limit) queryParams.append('limit', filters.limit);
			if (filters.isPublic !== undefined) queryParams.append('isPublic', filters.isPublic);

			const url = `/api/kanbans${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
			const response = await fetch(url);
			const data = await response.json();

			if (response.ok) {
				setKanbans(data.data);
			} else {
				setError(data.error || 'Error al cargar los kanbans');
			}
		} catch (err) {
			setError('Error de conexión: ' + err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Cargar kanbans al montar
	useEffect(() => {
		fetchKanbans();
	}, [fetchKanbans]);

	// Crear kanban
	const addKanban = useCallback(async (kanbanData) => {
		try {
			const response = await fetch('/api/kanbans', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(kanbanData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear el kanban');
				return null;
			}

			setKanbans(prev => [...prev, data.data]);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Obtener kanban por ID
	const getKanban = useCallback(async (kanbanId) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}`);
			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al obtener el kanban');
				return null;
			}

			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Actualizar kanban
	const updateKanban = useCallback(async (kanbanId, updates) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al actualizar el kanban');
				return null;
			}

			setKanbans(prev =>
				prev.map(k => k._id === kanbanId ? data.data : k)
			);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Eliminar kanban
	const deleteKanban = useCallback(async (kanbanId) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}`, {
				method: 'DELETE'
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al eliminar el kanban');
				return false;
			}

			setKanbans(prev => prev.filter(k => k._id !== kanbanId));
			return true;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return false;
		}
	}, []);

	// Obtener columnas de un kanban
	const getColumns = useCallback(async (kanbanId) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}/columns`);
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

	// Agregar columna
	const addColumn = useCallback(async (kanbanId, columnData) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}/columns`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(columnData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al agregar la columna');
				return null;
			}

			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Actualizar columna
	const updateColumn = useCallback(async (kanbanId, columnKey, updates) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}/columns/${columnKey}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al actualizar la columna');
				return null;
			}

			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Eliminar columna
	const deleteColumn = useCallback(async (kanbanId, columnKey) => {
		try {
			const response = await fetch(`/api/kanbans/${kanbanId}/columns/${columnKey}`, {
				method: 'DELETE'
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al eliminar la columna');
				return false;
			}

			return true;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return false;
		}
	}, []);

	return {
		kanbans,
		loading,
		error,
		addKanban,
		getKanban,
		updateKanban,
		deleteKanban,
		getColumns,
		addColumn,
		updateColumn,
		deleteColumn,
		refresh: fetchKanbans,
		clearError: () => setError(null)
	};
}
