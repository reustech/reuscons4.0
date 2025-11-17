import { z } from 'zod';

// Schema para Usuario - Crear/Editar
export const userSchema = z.object({
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),

  profile: z.object({
    firstName: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder 50 caracteres'),

    lastName: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder 50 caracteres'),

    email: z
      .string()
      .email('El email debe ser válido'),

    phone: z
      .string()
      .regex(/^\+?[0-9\s\-\(\)]{10,}$/, 'El teléfono debe ser válido')
      .optional()
      .or(z.literal('')),

    mobile: z
      .string()
      .regex(/^\+?[0-9\s\-\(\)]{10,}$/, 'El móvil debe ser válido')
      .optional()
      .or(z.literal('')),

    company: z
      .string()
      .max(100, 'La empresa no puede exceder 100 caracteres')
      .optional()
      .or(z.literal('')),

    position: z
      .string()
      .max(100, 'El puesto no puede exceder 100 caracteres')
      .optional()
      .or(z.literal('')),

    address: z
      .string()
      .max(200, 'La dirección no puede exceder 200 caracteres')
      .optional()
      .or(z.literal('')),

    city: z
      .string()
      .max(100, 'La ciudad no puede exceder 100 caracteres')
      .optional()
      .or(z.literal('')),

    country: z
      .string()
      .max(100, 'El país no puede exceder 100 caracteres')
      .optional()
      .or(z.literal('')),

    zipCode: z
      .string()
      .max(20, 'El código postal no puede exceder 20 caracteres')
      .optional()
      .or(z.literal('')),

    website: z
      .string()
      .url('El sitio web debe ser una URL válida')
      .optional()
      .or(z.literal('')),
  }),

  active: z.boolean().default(true),
});

// Schema simplificado para editar (sin contraseña)
export const userEditSchema = userSchema.omit({ password: true }).extend({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres')
    .optional()
    .or(z.literal('')),
});

// Schema para validar solo los campos requeridos
export const userQuickSchema = z.object({
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),

  profile: z.object({
    firstName: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres'),

    lastName: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres'),

    email: z
      .string()
      .email('El email debe ser válido'),
  }),

  active: z.boolean().default(true),
});
