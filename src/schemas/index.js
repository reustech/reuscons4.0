// Importar todos los schemas
import { userSchema, userEditSchema, userQuickSchema } from './user.schema';
import { projectSchema } from './project.schema';
import { kanbanSchema } from './kanban.schema';
import { fileSchema } from './file.schema';

// Exportar como un objeto centralizado para compatibilidad
export const SCHEMAS = {
  user: userSchema,
  userEdit: userEditSchema,
  userQuick: userQuickSchema,
  project: projectSchema,
  kanban: kanbanSchema,
  file: fileSchema,
};

// También exportar individualmente para importaciones directas
export { userSchema, userEditSchema, userQuickSchema } from './user.schema';
export { projectSchema } from './project.schema';
export { kanbanSchema } from './kanban.schema';
export { fileSchema } from './file.schema';
