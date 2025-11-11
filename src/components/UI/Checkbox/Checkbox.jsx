import React from 'react';

export default function Checkbox({
	id,
	name,
	checked,
	onChange,
	label,
	required = false,
	disabled = false,
	helpText,
}) {
	const styles = `
		.checkbox-wrapper {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.checkbox-container {
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}

		.checkbox-input {
			width: 20px;
			height: 20px;
			cursor: ${disabled ? 'not-allowed' : 'pointer'};
			accent-color: #667eea;
		}

		.checkbox-label {
			font-size: 0.95rem;
			color: #1f2937;
			cursor: ${disabled ? 'not-allowed' : 'pointer'};
			user-select: none;
			display: flex;
			align-items: center;
			gap: 0.25rem;
		}

		.checkbox-input:disabled,
		.checkbox-input:disabled + .checkbox-label {
			opacity: 0.6;
			cursor: not-allowed;
		}

		.checkbox-help {
			font-size: 0.85rem;
			color: #9ca3af;
			margin-left: 2rem;
		}
	`;

	return (
		<>
			<style>{styles}</style>
			<div className="checkbox-wrapper">
				<div className="checkbox-container">
					<input
						id={id}
						name={name}
						type="checkbox"
						checked={checked}
						onChange={onChange}
						required={required}
						disabled={disabled}
						className="checkbox-input"
					/>
					{label && (
						<label htmlFor={id} className="checkbox-label">
							{label}
							{required && (
								<span style={{ color: '#ef4444' }}>*</span>
							)}
						</label>
					)}
				</div>
				{helpText && <div className="checkbox-help">{helpText}</div>}
			</div>
		</>
	);
}
