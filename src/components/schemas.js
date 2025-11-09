import { z } from 'zod';

// Esquema para una tarea individual
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'La tarea no puede estar vacía'),
});

// Esquema para las tareas por columna
export const TasksSchema = z.record(z.array(TaskSchema));

// Validar una tarea
export const validateTask = (data) => {
  try {
    return TaskSchema.parse(data);
  } catch (error) {
    console.error('Error validando tarea:', error);
    return null;
  }
};

// Validar todas las tareas
export const validateTasks = (data) => {
  try {
    return TasksSchema.parse(data);
  } catch (error) {
    console.error('Error validando tareas:', error);
    return null;
  }
};
