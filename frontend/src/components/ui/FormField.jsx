export default function FormField({
	id,
	label,
	type = 'text',
	placeholder = '',
	error = '',
	register,
	validation = {}
}) {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: 'var(--spacing-xs)'
		}}>
			<label htmlFor={id} style={{
				color: 'var(--text-secondary)',
				fontSize: '0.875rem',
				fontWeight: '500',
				display: 'block'
			}}>
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				{...(register ? register(id, validation) : {})}
				style={{
					padding: 'var(--spacing-xs) var(--spacing-sm)',
					backgroundColor: 'var(--form-element-bg-color)',
					color: 'var(--body-color)',
					borderRadius: '0.375rem',
					border: `1px solid var(--form-element-border-color)`,
					fontSize: '1rem',
					fontFamily: 'inherit',
					transition: `border-color var(--transition-fast)`
				}}
			/>
			{error && (
				<span style={{
					color: '#f87171',
					fontSize: '0.75rem',
					fontWeight: '500'
				}}>
					{error}
				</span>
			)}
		</div>
	);
}
