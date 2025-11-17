export default function Button({
	children,
	type = 'button',
	variant = 'primary',
	disabled = false,
	onClick,
	...props
}) {
	const baseStyle = {
		width: '100%',
		padding: `var(--spacing-xs) var(--spacing-lg)`,
		fontWeight: '600',
		fontSize: '1rem',
		border: 'none',
		borderRadius: '0.375rem',
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: `background-color var(--transition-fast), opacity var(--transition-fast)`,
		opacity: disabled ? 0.6 : 1,
	};

	const variantStyles = {
		primary: {
			backgroundColor: 'var(--primary-color)',
			color: 'var(--text-primary)',
		},
		secondary: {
			backgroundColor: 'var(--form-element-bg-color)',
			color: 'var(--text-primary)',
			border: `1px solid var(--form-element-border-color)`,
		},
	};

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			style={{
				...baseStyle,
				...variantStyles[variant],
			}}
			onMouseEnter={(e) => {
				if (!disabled) {
					e.target.style.backgroundColor =
						variant === 'primary' ? 'var(--primary-dark)' : 'var(--border-hover)';
				}
			}}
			onMouseLeave={(e) => {
				e.target.style.backgroundColor =
					variant === 'primary' ? 'var(--primary-color)' : 'var(--form-element-bg-color)';
			}}
			{...props}
		>
			{children}
		</button>
	);
}
