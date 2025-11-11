import React from 'react';

export default function Textarea({ id, name, value, onChange, placeholder, label }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
			{label && <label htmlFor={id} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>{label}</label>}
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				style={{
					padding: '0.75rem',
					border: '1px solid #ddd',
					borderRadius: '6px',
					fontSize: '0.95rem',
					fontFamily: 'inherit',
					minHeight: '80px',
					resize: 'vertical',
				}}
			/>
		</div>
	);
}
