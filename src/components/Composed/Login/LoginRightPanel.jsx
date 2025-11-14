import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginRightPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 md:px-16">
      <div className="w-full max-w-md flex flex-col">

        {/* Sign In Title */}
        <h2 className="text-4xl md:text-5xl h-20 font-bold text-white text-center mb-10">Sign in</h2>


        {/* Login Form */}
        <form className="flex flex-col gap-10">

          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-white/90 text-sm font-medium block">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 bg-white/95 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-4!"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white/90 text-sm font-medium block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white/95 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-4!"
              required
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-1/2 h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors rounded-md"
          >
            Sign in now
          </Button>
        </form>
      </div>
    </div>
  );
}
