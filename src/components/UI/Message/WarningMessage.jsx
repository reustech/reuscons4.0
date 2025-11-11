import React from 'react';

export default function WarningMessage({ title, message, isDanger = false }) {
	const bgColor = isDanger ? '#fee2e2' : '#fffbeb';
	const borderColor = isDanger ? '#fecaca' : '#fbbf24';
	const textColor = isDanger ? '#991b1b' : '#92400e';

	return (
		<div
			style={{
				background: bgColor,
				border: `2px solid ${borderColor}`,
				borderRadius: '8px',
				padding: '1rem',
				margin: '1rem 0',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
				<div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{isDanger ? '❌' : '⚠️'}</div>
				<h3 style={{ fontWeight: 600, color: textColor, margin: 0, fontSize: '1rem' }}>{title}</h3>
			</div>
			{message && (
				<p style={{ color: textColor, fontSize: '0.95rem', margin: 0, marginLeft: '2.25rem', lineHeight: 1.5 }}>
					{message}
				</p>
			)}
		</div>
	);
}
