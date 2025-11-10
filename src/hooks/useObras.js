import { useState, useEffect, useCallback } from 'react';

export function useObras() {
	const [obras, setObras] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Cargar obras del API
	const fetchObras = useCallback(async (filters = {}) => {
		setLoading(true);
		setError(null);

		try {
			const queryParams = new URLSearchParams();
			if (filters.status) queryParams.append('status', filters.status);
			if (filters.userId) queryParams.append('userId', filters.userId);
			if (filters.page) queryParams.append('page', filters.page);
			if (filters.limit) queryParams.append('limit', filters.limit);

			const url = `/api/obras${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
			const response = await fetch(url);
			const data = await response.json();

			if (response.ok) {
				setObras(data.data);
			} else {
				setError(data.error || 'Error al cargar las obras');
			}
		} catch (err) {
			setError('Error de conexión: ' + err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Cargar obras al montar
	useEffect(() => {
		fetchObras();
	}, [fetchObras]);

	// Crear obra
	const addObra = useCallback(async (obraData) => {
		try {
			const response = await fetch('/api/obras', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obraData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al crear la obra');
				return null;
			}

			setObras(prev => [...prev, data.data]);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Obtener obra por ID
	const getObra = useCallback(async (obraId) => {
		try {
			const response = await fetch(`/api/obras/${obraId}`);
			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al obtener la obra');
				return null;
			}

			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Actualizar obra
	const updateObra = useCallback(async (obraId, updates) => {
		try {
			const response = await fetch(`/api/obras/${obraId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al actualizar la obra');
				return null;
			}

			setObras(prev =>
				prev.map(o => o._id === obraId ? data.data : o)
			);
			return data.data;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return null;
		}
	}, []);

	// Eliminar obra
	const deleteObra = useCallback(async (obraId) => {
		try {
			const response = await fetch(`/api/obras/${obraId}`, {
				method: 'DELETE'
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Error al eliminar la obra');
				return false;
			}

			setObras(prev => prev.filter(o => o._id !== obraId));
			return true;
		} catch (err) {
			setError('Error de conexión: ' + err.message);
			return false;
		}
	}, []);

	// Buscar obras
	const searchObras = useCallback(async (query) => {
		try {
			const response = await fetch(`/api/obras/search?q=${encodeURIComponent(query)}`);
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

	// Obtener obras por usuario
	const getObrasByUser = useCallback(async (userId) => {
		try {
			const response = await fetch(`/api/obras/user/${userId}`);
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

	// Obtener obras por status
	const getObrasByStatus = useCallback(async (status) => {
		try {
			const response = await fetch(`/api/obras/status/${status}`);
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
		obras,
		loading,
		error,
		addObra,
		getObra,
		updateObra,
		deleteObra,
		searchObras,
		getObrasByUser,
		getObrasByStatus,
		refresh: fetchObras,
		clearError: () => setError(null)
	};
}
