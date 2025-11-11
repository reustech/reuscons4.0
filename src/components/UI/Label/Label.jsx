import React from 'react';

export default function Label({ htmlFor, children }) {
	const styles = {
		display: 'block',
		fontSize: '0.9rem',
		fontWeight: '600',
		color: '#1f2937',
		marginBottom: '0.75rem',
	};

	return <label htmlFor={htmlFor} style={styles}>{children}</label>;
}
