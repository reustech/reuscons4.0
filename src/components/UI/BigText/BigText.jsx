import React from 'react';

export default function BigText({ children }) {
	const styles = {
		fontSize: '4rem',
		lineHeight: '1.2',
		fontWeight: '700',
		marginBottom: '2rem',
		letterSpacing: '-1px',
		color: 'white',
	};

	return <h1 style={styles}>{children}</h1>;
}
