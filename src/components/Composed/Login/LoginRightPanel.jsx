import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginRightPanel() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    // Aquí iría la lógica de autenticación
    if (data.username === 'admin' && data.password === 'admin') {
      window.location.href = '/DashboardAdmin';
    } else {
      window.location.href = '/Dashboard';
    }
  };

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 md:px-16">
      <div className="w-full max-w-md flex flex-col">

        {/* Sign In Title */}
        <h2 className="text-4xl md:text-5xl h-20 font-bold text-white text-center mb-10">Sign in</h2>


        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-white/90 text-sm font-medium block">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="your username"
              {...register('username', {
                required: 'El usuario es requerido',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              })}
              className="h-12 bg-white/95 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-4!"
            />
            {errors.username && (
              <span className="text-red-400 text-xs">{errors.username.message}</span>
            )}
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
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              })}
              className="h-12 bg-white/95 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 px-4!"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">{errors.password.message}</span>
            )}
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
