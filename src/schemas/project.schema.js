import { z } from 'zod';

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
