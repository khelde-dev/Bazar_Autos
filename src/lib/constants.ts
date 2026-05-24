/**
 * Roles disponibles en el sistema.
 * El backend valida el acceso vía middleware requireRole.
 */
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;
