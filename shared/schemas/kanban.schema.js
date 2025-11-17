import { z } from 'zod';

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
