export default function LoginLeftPanel() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        color: 'var(--text-primary)',
        maxWidth: '28rem',
        textAlign: 'left'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: 'var(--spacing-sm)',
          lineHeight: 1.2
        }}>
          Welcome<br />Back
        </h1>
        <p style={{
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-lg)',
          opacity: 0.95,
          color: 'var(--text-secondary)'
        }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point using.
        </p>

        {/* Social Icons */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          justifyContent: 'flex-start'
        }}>
          <a
            href="#"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: `2px solid var(--border-light)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: `all var(--transition-normal)`,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="#"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: `2px solid var(--border-light)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: `all var(--transition-normal)`,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            aria-label="Twitter"
          >
            𝕏
          </a>
          <a
            href="#"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: `2px solid var(--border-light)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: `all var(--transition-normal)`,
              textDecoration: 'none',
              fontSize: '0.8rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="#"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: `2px solid var(--border-light)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: `all var(--transition-normal)`,
              textDecoration: 'none',
              fontSize: '0.8rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            aria-label="YouTube"
          >
            ▶️
          </a>
        </div>
      </div>
    </div>
  );
}
