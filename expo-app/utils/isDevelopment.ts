/**
 * environment.ts
 *
 * Environment Detection Utilities
 *
 * Functions for determining the current execution environment.
 */

/**
 * Determine if we're in a development environment
 */
export const isDevelopment = (): boolean => {
  return typeof window !== 'undefined' && window.location.hostname === 'localhost';
};
