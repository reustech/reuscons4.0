import LoginLeftPanel from './LoginLeftPanel';
import LoginRightPanel from './LoginRightPanel';

export default function LoginForm() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        //backgroundImage: 'url(/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1
      }} />

      <LoginLeftPanel />
      <LoginRightPanel />
    </div>
  );
}
