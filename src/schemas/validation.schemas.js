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

// Schema para Proyecto
export const projectSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre del proyecto debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),

  status: z.enum(['Activo', 'Pausado', 'Completado', 'Cancelado']).default('Activo'),

  startDate: z
    .string()
    .datetime({ message: 'La fecha de inicio debe ser válida' })
    .optional()
    .or(z.literal('')),

  endDate: z
    .string()
    .datetime({ message: 'La fecha de fin debe ser válida' })
    .optional()
    .or(z.literal('')),

  budget: z
    .number()
    .min(0, 'El presupuesto no puede ser negativo')
    .optional(),

  manager: z
    .string()
    .optional()
    .or(z.literal('')),
});

// Schema para Kanban
export const kanbanSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre del tablero debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),

  columns: z
    .array(
      z.object({
        name: z.string().min(2, 'El nombre de la columna debe tener al menos 2 caracteres'),
      })
    )
    .min(1, 'Al menos una columna es requerida'),
});

// Schema para Archivo
export const fileSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre del archivo debe tener al menos 3 caracteres')
    .max(255, 'El nombre no puede exceder 255 caracteres'),

  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),

  type: z.enum(['Documento', 'Imagen', 'Video', 'Audio', 'Otro']).default('Documento'),

  tags: z
    .string()
    .optional()
    .or(z.literal('')),
});

export const SCHEMAS = {
  user: userSchema,
  userEdit: userEditSchema,
  userQuick: userQuickSchema,
  project: projectSchema,
  kanban: kanbanSchema,
  file: fileSchema,
};
