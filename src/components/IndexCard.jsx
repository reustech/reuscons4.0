export default function IndexCard({ Icon, title, description }) {
  return (
    <article style={{
      textAlign: 'center',
      padding: 'var(--spacing-md)',
      borderRadius: '0.5rem'
    }}>
      <div style={{
        fontSize: '2.5rem',
        marginBottom: 'var(--spacing-sm)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--primary-color)',
        transition: `color var(--transition-normal)`
      }}>
        {Icon && <Icon size={40} strokeWidth={1.5} />}
      </div>
      <h3 style={{
        color: 'var(--text-primary)',
        marginBottom: 'var(--spacing-xs)'
      }}>
        {title}
      </h3>
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
    </article>
  );
}
