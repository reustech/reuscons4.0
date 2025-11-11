import React from 'react';

export default function SmallText({ children, color = 'rgba(255, 255, 255, 0.6)' }) {
	const styles = {
		fontSize: '1rem',
		letterSpacing: '3px',
		textTransform: 'uppercase',
		color: color,
		marginBottom: '2rem',
		fontWeight: '400',
	};

	return <h2 style={styles}>{children}</h2>;
}
