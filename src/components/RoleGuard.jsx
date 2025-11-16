import { canPerformAction } from '../utils/permissionUtils';

/**
 * RoleGuard Component
 * Protege acciones basadas en permisos del usuario
 *
 * @param {string} resource - Recurso (ej: 'users', 'projects')
 * @param {string} action - Acción (ej: 'create', 'edit', 'delete')
 * @param {object} currentUser - Usuario actual
 * @param {React.ReactNode} children - Contenido a proteger
 * @param {React.ReactNode} fallback - Contenido a mostrar si no hay permiso
 */
export function RoleGuard({
  resource,
  action,
  currentUser,
  children,
  fallback = null,
}) {
  if (!currentUser || !currentUser.role) {
    return fallback;
  }

  const hasPermission = canPerformAction(currentUser.role, resource, action);

  if (!hasPermission) {
    return fallback;
  }

  return children;
}

/**
 * Hook para verificar permisos
 * Uso: const hasPermission = useCanPerform('users', 'create', currentUser);
 */
export function useCanPerform(resource, action, currentUser) {
  if (!currentUser || !currentUser.role) return false;
  return canPerformAction(currentUser.role, resource, action);
}

export default RoleGuard;
