import React from 'react';

export default function Button({ children, onClick, type = 'button' }) {
	const styles = {
		width: '100%',
		padding: '0.875rem 1rem',
		background: '#1f2937',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		marginBottom: '1rem',
	};

	return (
		<button
			type={type}
			style={styles}
			onClick={onClick}
			onMouseEnter={(e) => {
				e.target.style.background = '#111827';
				e.target.style.transform = 'translateY(-1px)';
			}}
			onMouseLeave={(e) => {
				e.target.style.background = '#1f2937';
				e.target.style.transform = 'translateY(0)';
			}}
		>
			{children}
		</button>
	);
}
