import React from 'react';

export default function ModalFooter({
	onCancel,
	onSubmit,
	submitLabel = 'Guardar',
	cancelLabel = 'Cancelar',
	isLoading = false,
	isDangerous = false,
	submitDisabled = false,
}) {
	const submitButtonStyle = {
		background: isDangerous
			? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
			: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		color: 'white',
		border: 'none',
		padding: '0.75rem 1.5rem',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontWeight: '600',
		cursor: submitDisabled || isLoading ? 'not-allowed' : 'pointer',
		transition: 'all 0.3s ease',
		opacity: submitDisabled || isLoading ? 0.6 : 1,
		boxShadow: isDangerous
			? '0 4px 15px rgba(239, 68, 68, 0.3)'
			: '0 4px 15px rgba(102, 126, 234, 0.3)',
	};

	const cancelButtonStyle = {
		background: 'white',
		border: '2px solid #e5e7eb',
		color: '#1f2937',
		padding: '0.75rem 1.5rem',
		borderRadius: '8px',
		fontSize: '0.95rem',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
	};

	const footerStyle = {
		padding: '1.5rem',
		borderTop: '1px solid #e5e7eb',
		display: 'flex',
		gap: '1rem',
		justifyContent: 'flex-end',
		flexWrap: 'wrap',
	};

	return (
		<div style={footerStyle}>
			<button
				type="button"
				onClick={onCancel}
				style={cancelButtonStyle}
				onMouseEnter={(e) =>
					(e.target.style.background = '#f9fafb')
				}
				onMouseLeave={(e) => (e.target.style.background = 'white')}
			>
				{cancelLabel}
			</button>
			{onSubmit && (
				<button
					type="button"
					onClick={onSubmit}
					disabled={submitDisabled || isLoading}
					style={submitButtonStyle}
					onMouseEnter={(e) => {
						if (!submitDisabled && !isLoading) {
							e.target.style.transform = 'translateY(-2px)';
							e.target.style.boxShadow = isDangerous
								? '0 6px 20px rgba(239, 68, 68, 0.4)'
								: '0 6px 20px rgba(102, 126, 234, 0.4)';
						}
					}}
					onMouseLeave={(e) => {
						e.target.style.transform = 'translateY(0)';
						e.target.style.boxShadow = isDangerous
							? '0 4px 15px rgba(239, 68, 68, 0.3)'
							: '0 4px 15px rgba(102, 126, 234, 0.3)';
					}}
				>
					{isLoading ? '⏳ ' + submitLabel : submitLabel}
				</button>
			)}
		</div>
	);
}
