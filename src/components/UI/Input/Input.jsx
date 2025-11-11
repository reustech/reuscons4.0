export default function Input({ id, name, type = 'text', placeholder, required = false }) {
	const styles = {
		width: '100%',
		padding: '0.875rem 1rem',
		border: '2px solid #e5e7eb',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontFamily: 'inherit',
		transition: 'all 0.3s ease',
		boxSizing: 'border-box',
		background: '#f9fafb',
	};

	return (
		<input
			id={id}
			name={name}
			type={type}
			placeholder={placeholder}
			required={required}
			style={styles}
			onFocus={(e) => {
				e.target.style.borderColor = '#667eea';
				e.target.style.background = 'white';
				e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
			}}
			onBlur={(e) => {
				e.target.style.borderColor = '#e5e7eb';
				e.target.style.background = '#f9fafb';
				e.target.style.boxShadow = 'none';
			}}
		/>
	);
}
