export default function Select({ id, name, value, onChange, children, required = false, disabled = false }) {
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
		cursor: disabled ? 'not-allowed' : 'pointer',
		opacity: disabled ? 0.6 : 1,
	};

	return (
		<select
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			required={required}
			disabled={disabled}
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
		>
			{children}
		</select>
	);
}
