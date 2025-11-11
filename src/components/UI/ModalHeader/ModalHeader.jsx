import React from 'react';

export default function ModalHeader({ title, isDanger = false }) {
	return (
		<div
			style={{
				padding: '1rem',
				borderBottom: '1px solid #e5e7eb',
				background: isDanger ? '#ef4444' : '#667eea',
				color: 'white',
			}}
		>
			<h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
				{title}
			</h2>
		</div>
	);
}
