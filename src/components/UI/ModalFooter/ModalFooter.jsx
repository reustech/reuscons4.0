import React from 'react';

export default function ModalFooter({
	onCancel,
	onSubmit,
	submitLabel = 'Guardar',
	cancelLabel = 'Cancelar',
	isDangerous = false,
}) {
	return (
		<div
			style={{
				padding: '1rem',
				borderTop: '1px solid #e5e7eb',
				display: 'flex',
				gap: '0.75rem',
				justifyContent: 'flex-end',
			}}
		>
			<button
				onClick={onCancel}
				style={{
					background: 'white',
					border: '1px solid #e5e7eb',
					padding: '0.5rem 1rem',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				{cancelLabel}
			</button>
			<button
				onClick={onSubmit}
				style={{
					background: isDangerous ? '#ef4444' : '#667eea',
					color: 'white',
					border: 'none',
					padding: '0.5rem 1rem',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				{submitLabel}
			</button>
		</div>
	);
}
