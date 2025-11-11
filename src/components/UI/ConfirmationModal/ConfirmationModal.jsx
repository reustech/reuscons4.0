import React from 'react';
import BaseModal from '../BaseModal/BaseModal.jsx';
import ModalFooter from '../ModalFooter/ModalFooter.jsx';

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Confirmar',
	message,
	confirmText = 'Confirmar',
	isDangerous = false,
}) {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title={title}>
			<div style={{ padding: '1rem' }}>
				<p style={{ margin: '0 0 1rem 0', color: '#333' }}>
					{message}
				</p>
			</div>
			<ModalFooter
				onCancel={onClose}
				onSubmit={onConfirm}
				submitLabel={confirmText}
				isDangerous={isDangerous}
			/>
		</BaseModal>
	);
}
