import { z } from 'zod';

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
