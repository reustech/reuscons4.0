import { Lock, AlertCircle, X } from 'lucide-react';

export default function AccessDeniedNotification({
  title = 'Acceso Denegado',
  message = 'No tienes permisos para realizar esta acción.',
  requiredRole = null,
  onClose = null,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        backgroundColor: 'rgba(239, 68, 68, 0.95)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        maxWidth: '400px',
        zIndex: 10000,
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 'bold' }}>
          {title}
        </h4>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', opacity: 0.9 }}>
          {message}
        </p>
        {requiredRole && (
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
            Rol requerido: <strong>{requiredRole}</strong>
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
