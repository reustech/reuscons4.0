export default function ErrorMessage({ message }) {
	const styles = {
		backgroundColor: '#fee2e2',
		border: '1px solid #fecaca',
		borderRadius: '8px',
		color: '#dc2626',
		padding: '1rem',
		marginBottom: '1.5rem',
		fontSize: '0.95rem',
		fontWeight: '500',
	};

	return <div style={styles}>{message}</div>;
}
