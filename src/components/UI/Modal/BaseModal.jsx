import React from 'react';

export default function BaseModal({
	isOpen,
	onClose,
	title,
	children,
	headerVariant = 'primary',
	size = 'medium',
	closeOnOverlay = true,
}) {
	if (!isOpen) return null;

	const handleOverlayClick = () => {
		if (closeOnOverlay) {
			onClose();
		}
	};

	const sizeClasses = {
		small: 'modal-container-small',
		medium: 'modal-container-medium',
		large: 'modal-container-large',
	};

	const styles = `
		.modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1000;
			animation: fadeIn 0.2s ease-in-out;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}

		.modal-container {
			background: white;
			border-radius: 12px;
			box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
			max-height: 90vh;
			overflow-y: auto;
			animation: slideIn 0.3s ease-out;
		}

		@keyframes slideIn {
			from {
				transform: translateY(-50px);
				opacity: 0;
			}
			to {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.modal-container-small {
			width: 90%;
			max-width: 400px;
		}

		.modal-container-medium {
			width: 90%;
			max-width: 600px;
		}

		.modal-container-large {
			width: 90%;
			max-width: 800px;
		}

		@media (max-width: 640px) {
			.modal-container {
				width: 95% !important;
				max-width: none !important;
				border-radius: 8px;
			}
		}
	`;

	return (
		<>
			<style>{styles}</style>
			<div className="modal-overlay" onClick={handleOverlayClick}>
				<div
					className={`modal-container ${sizeClasses[size]}`}
					onClick={(e) => e.stopPropagation()}
				>
					{title && (
						<div
							style={{
								padding: '1.5rem',
								borderBottom: '1px solid #e5e7eb',
								background:
									headerVariant === 'danger'
										? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
										: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								color: 'white',
								borderRadius: '12px 12px 0 0',
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
						</div>
					)}
					<div>{children}</div>
				</div>
			</div>
		</>
	);
}
