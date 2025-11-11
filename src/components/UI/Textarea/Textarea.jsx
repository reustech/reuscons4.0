import React from 'react';

export default function Textarea({
	id,
	name,
	value,
	onChange,
	placeholder,
	required = false,
	minHeight = '100px',
	maxLength,
	disabled = false,
	label,
}) {
	const styles = `
		.textarea-wrapper {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.textarea-label {
			font-size: 0.9rem;
			font-weight: 600;
			color: #1f2937;
		}

		.textarea-input {
			padding: 0.875rem 1rem;
			border: 2px solid #e5e7eb;
			border-radius: 8px;
			font-size: 0.95rem;
			font-family: inherit;
			transition: all 0.3s ease;
			box-sizing: border-box;
			background: #f9fafb;
			resize: vertical;
			min-height: ${minHeight};
		}

		.textarea-input:focus {
			outline: none;
			border-color: #667eea;
			background: white;
			box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		}

		.textarea-input::placeholder {
			color: #9ca3af;
		}

		.textarea-input:disabled {
			background: #f3f4f6;
			color: #9ca3af;
			cursor: not-allowed;
		}

		.textarea-counter {
			font-size: 0.8rem;
			color: #9ca3af;
			text-align: right;
		}
	`;

	return (
		<>
			<style>{styles}</style>
			<div className="textarea-wrapper">
				{label && (
					<label htmlFor={id} className="textarea-label">
						{label}
						{required && <span style={{ color: '#ef4444' }}>*</span>}
					</label>
				)}
				<textarea
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					maxLength={maxLength}
					disabled={disabled}
					className="textarea-input"
				/>
				{maxLength && (
					<div className="textarea-counter">
						{value.length}/{maxLength}
					</div>
				)}
			</div>
		</>
	);
}
