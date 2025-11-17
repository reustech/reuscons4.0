export default function AdminCard({ icon, title, description, onClick }) {
	return (
		<article
			style={{
				textAlign: 'center',
				padding: 'var(--spacing-md)',
				borderRadius: '0.5rem',
				cursor: onClick ? 'pointer' : 'default',
				transition: 'all var(--transition-normal)',
				minHeight: '140px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			onClick={onClick}
			onMouseEnter={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = 'translateY(-4px)';
					e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
				}
			}}
			onMouseLeave={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = 'translateY(0)';
					e.currentTarget.style.boxShadow = 'none';
				}
			}}
		>
			<div
				style={{
					fontSize: '2rem',
					marginBottom: 'var(--spacing-sm)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{icon}
			</div>
			<h3
				style={{
					color: 'var(--text-primary)',
					marginBottom: 'var(--spacing-xs)',
					fontSize: '1rem',
					margin: '0 0 var(--spacing-xs) 0',
				}}
			>
				{title}
			</h3>
			<p
				style={{
					color: 'var(--text-muted)',
					fontSize: '0.75rem',
					lineHeight: '1.4',
					margin: 0,
				}}
			>
				{description}
			</p>
		</article>
	);
}
