import React from 'react';

export default function WarningMessage({
	title,
	message,
	icon = '⚠️',
	type = 'warning',
}) {
	const typeStyles = {
		warning: {
			background: '#fffbeb',
			border: '#fbbf24',
			text: '#92400e',
			icon: '⚠️',
		},
		danger: {
			background: '#fee2e2',
			border: '#fecaca',
			text: '#991b1b',
			icon: '❌',
		},
		info: {
			background: '#eff6ff',
			border: '#93c5fd',
			text: '#1e40af',
			icon: 'ℹ️',
		},
		success: {
			background: '#f0fdf4',
			border: '#86efac',
			text: '#166534',
			icon: '✓',
		},
	};

	const style = typeStyles[type] || typeStyles.warning;

	const styles = `
		.warning-message {
			background: ${style.background};
			border: 2px solid ${style.border};
			border-radius: 8px;
			padding: 1rem;
			margin: 1rem 0;
		}

		.warning-message-header {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			margin-bottom: 0.5rem;
		}

		.warning-message-icon {
			font-size: 1.5rem;
			flex-shrink: 0;
		}

		.warning-message-title {
			font-weight: 600;
			color: ${style.text};
			margin: 0;
			font-size: 1rem;
		}

		.warning-message-content {
			color: ${style.text};
			font-size: 0.95rem;
			margin: 0;
			margin-left: 2.25rem;
			line-height: 1.5;
		}
	`;

	return (
		<>
			<style>{styles}</style>
			<div className="warning-message">
				<div className="warning-message-header">
					<div className="warning-message-icon">{icon}</div>
					<h3 className="warning-message-title">{title}</h3>
				</div>
				{message && <p className="warning-message-content">{message}</p>}
			</div>
		</>
	);
}
