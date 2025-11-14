import LoginLeftPanel from './LoginLeftPanel';
import LoginRightPanel from './LoginRightPanel';

export default function LoginForm() {
  return (
    <div
      className="w-full h-screen flex overflow-hidden"
      style={{
        backgroundImage: 'url(/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <LoginLeftPanel />
      <LoginRightPanel />
    </div>
  );
}
