import React from 'react';

export default function Checkbox({ id, name, checked, onChange, label }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<input
				id={id}
				name={name}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				style={{ width: '18px', height: '18px', cursor: 'pointer' }}
			/>
			{label && <label htmlFor={id} style={{ fontSize: '0.95rem', color: '#333', cursor: 'pointer' }}>{label}</label>}
		</div>
	);
}
