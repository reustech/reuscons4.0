import React from 'react';

export default function Paragraph({ children, color = 'inherit', fontSize = '0.95rem' }) {
	const styles = {
		fontSize: fontSize,
		lineHeight: '1.5',
		color: color,
		margin: '0',
	};

	return <p style={styles}>{children}</p>;
}
