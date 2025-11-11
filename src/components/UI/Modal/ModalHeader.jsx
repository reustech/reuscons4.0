import React from 'react';

export default function ModalHeader({ title, variant = 'primary', onClose }) {
	const variantStyles = {
		primary: {
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		},
		danger: {
			background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
		},
		warning: {
			background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
		},
		success: {
			background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
		},
	};

	return (
		<div
			style={{
				padding: '1.5rem',
				borderBottom: '1px solid #e5e7eb',
				color: 'white',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				...variantStyles[variant],
			}}
		>
			<h2
				style={{
					margin: 0,
					fontSize: '1.5rem',
					fontWeight: 700,
				}}
			>
				{title}
			</h2>
			{onClose && (
				<button
					onClick={onClose}
					style={{
						background: 'rgba(255, 255, 255, 0.2)',
						border: 'none',
						color: 'white',
						fontSize: '1.5rem',
						cursor: 'pointer',
						width: '32px',
						height: '32px',
						borderRadius: '6px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'background 0.2s ease',
					}}
					onMouseEnter={(e) =>
						(e.target.style.background = 'rgba(255, 255, 255, 0.3)')
					}
					onMouseLeave={(e) =>
						(e.target.style.background = 'rgba(255, 255, 255, 0.2)')
					}
				>
					×
				</button>
			)}
		</div>
	);
}
