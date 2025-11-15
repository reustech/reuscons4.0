import { useForm } from 'react-hook-form';

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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-xs)'
          }}>
            <label htmlFor="username" style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'block'
            }}>
              Username
            </label>
            <input
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
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#111827',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {errors.username && (
              <span style={{
                color: '#f87171',
                fontSize: '0.75rem'
              }}>
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-xs)'
          }}>
            <label htmlFor="password" style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'block'
            }}>
              Password
            </label>
            <input
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
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#111827',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {errors.password && (
              <span style={{
                color: '#f87171',
                fontSize: '0.75rem'
              }}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--primary-color)',
              color: 'var(--text-primary)',
              fontWeight: '600',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: `background-color var(--transition-fast)`
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-dark)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
          >
            Sign in now
          </button>
        </form>
      </div>
    </div>
  );
}
