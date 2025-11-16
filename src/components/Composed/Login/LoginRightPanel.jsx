import { useForm } from 'react-hook-form';
import FormField from '../../FormField.jsx';
import Button from '../../Button.jsx';

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
      window.location.href = '/dash_admin';
    } else {
      window.location.href = '/dash_user';
    }
  };

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Sign In Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--spacing-xl)'
        }}>
          Sign in
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xl)'
        }}>

          {/* Username Field */}
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="your username"
            register={register}
            validation={{
              required: 'El usuario es requerido',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
            }}
            error={errors.username?.message}
          />

          {/* Password Field */}
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            register={register}
            validation={{
              required: 'La contraseña es requerida',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
            }}
            error={errors.password?.message}
          />

          {/* Sign In Button */}
          <Button type="submit" variant="primary">
            Sign in now
          </Button>
        </form>
      </div>
    </div>
  );
}
