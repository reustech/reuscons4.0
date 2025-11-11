import React, { useState } from 'react';
import BaseModal from './BaseModal.jsx';
import ModalHeader from './ModalHeader.jsx';
import ModalFooter from './ModalFooter.jsx';
import WarningMessage from '../Message/WarningMessage.jsx';

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Confirmar Acción',
	message,
	confirmText = 'Eliminar',
	cancelText = 'Cancelar',
	isDangerous = true,
	requiresInput = false,
	inputPlaceholder = 'Escribe el nombre para confirmar',
	inputValue,
	onInputChange,
	isLoading = false,
	size = 'medium',
}) {
	const [internalInput, setInternalInput] = useState('');

	const handleConfirm = () => {
		if (requiresInput && internalInput !== inputValue) {
			alert('El texto no coincide');
			return;
		}
		onConfirm();
		setInternalInput('');
	};

	const handleClose = () => {
		setInternalInput('');
		onClose();
	};

	const isConfirmDisabled =
		requiresInput && internalInput !== inputValue;

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={handleClose}
			title={title}
			headerVariant={isDangerous ? 'danger' : 'primary'}
			size={size}
			closeOnOverlay={false}
		>
			<div style={{ padding: '1.5rem' }}>
				<WarningMessage
					title={isDangerous ? 'Acción Destructiva' : 'Confirmación'}
					message={message}
					type={isDangerous ? 'danger' : 'warning'}
					icon={isDangerous ? '❌' : '⚠️'}
				/>

				{requiresInput && (
					<div style={{ marginTop: '1.5rem' }}>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontSize: '0.9rem',
								fontWeight: '600',
								color: '#1f2937',
							}}
						>
							Confirma escribiendo:{' '}
							<span
								style={{
									color: '#667eea',
									fontWeight: 700,
								}}
							>
								{inputValue}
							</span>
						</label>
						<input
							type="text"
							placeholder={inputPlaceholder}
							value={internalInput}
							onChange={(e) => setInternalInput(e.target.value)}
							style={{
								width: '100%',
								padding: '0.875rem 1rem',
								border: '2px solid #e5e7eb',
								borderRadius: '8px',
								fontSize: '0.95rem',
								fontFamily: 'inherit',
								boxSizing: 'border-box',
								background: '#f9fafb',
								transition: 'all 0.3s ease',
							}}
							onFocus={(e) => {
								e.target.style.borderColor = '#667eea';
								e.target.style.background = 'white';
								e.target.style.boxShadow =
									'0 0 0 3px rgba(102, 126, 234, 0.1)';
							}}
							onBlur={(e) => {
								e.target.style.borderColor = '#e5e7eb';
								e.target.style.background = '#f9fafb';
								e.target.style.boxShadow = 'none';
							}}
						/>
					</div>
				)}
			</div>

			<ModalFooter
				onCancel={handleClose}
				onSubmit={handleConfirm}
				submitLabel={confirmText}
				cancelLabel={cancelText}
				isLoading={isLoading}
				isDangerous={isDangerous}
				submitDisabled={isConfirmDisabled}
			/>
		</BaseModal>
	);
}
