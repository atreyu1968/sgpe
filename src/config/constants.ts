/**
 * User Roles Configuration
 * Defines all possible user roles in the system
 */
export const USER_ROLES = {
  GENERAL_COORDINATOR: 'general_coordinator',
  ADMINISTRATOR: 'administrator',
  JUDGE: 'judge',
  CONTESTANT: 'contestant',
  GUEST: 'guest'
} as const;

/**
 * Type definition for user roles
 */
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

/**
 * Helper function to validate if a role is valid
 */
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}