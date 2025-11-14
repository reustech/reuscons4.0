import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm({ errorMessage = '' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create form data for server-side processing
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Submit the form to trigger Astro's server-side handler
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
    <div className="w-full max-w-md">
      {/* Sign In Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Sign in
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
            />
            <Label htmlFor="remember" className="text-sm text-gray-600 font-normal cursor-pointer">
              Remember Me
            </Label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Lost your password?
          </a>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors"
        >
          {isLoading ? 'Signing in...' : 'Sign in now'}
        </Button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>
          By clicking on "Sign in now" you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Terms of Service
          </a>
          {' '}|{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Test Credentials Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-xs text-blue-700">
        <p className="font-semibold mb-1">Credenciales de prueba:</p>
        <p>Admin: <strong>admin</strong> / <strong>admin</strong></p>
        <p>User: <strong>user</strong> / <strong>user</strong></p>
      </div>
    </div>
  );
}
