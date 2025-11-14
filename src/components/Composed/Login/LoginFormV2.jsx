import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginFormV2({ errorMessage = '' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = document.createElement('form');
    form.method = 'POST';
    form.style.display = 'none';

    const usernameInput = document.createElement('input');
    usernameInput.name = 'username';
    usernameInput.value = username;

    const passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    passwordInput.value = password;

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-between overflow-hidden"
      style={{
        backgroundImage: 'url(/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Left Panel - Welcome Back */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-16">
        <div className="text-white max-w-md text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome<br />Back
          </h1>
          <p className="text-base font-light leading-relaxed mb-8 opacity-95">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point using.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="#"
              className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-sm" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-sm" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-sm" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-sm" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-16">
        <div className="w-full max-w-sm">
          {/* Sign In Title */}
          <h2 className="text-3xl font-bold text-white mb-8">Sign in</h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-500/90 border border-red-400 rounded-lg">
              <p className="text-sm text-white font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Username Field */}
            <div>
              <Label htmlFor="username" className="text-white/90 text-sm font-medium block mb-3">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-white/95 border-0 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-3!"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-white/90 text-sm font-medium block mb-3">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/95 border-0 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-3!"
                required
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors rounded-md"
            >
              {isLoading ? 'Signing in...' : 'Sign in now'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
