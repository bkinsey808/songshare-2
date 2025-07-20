/**
 * Debug logging utility
 *
 * Provides controlled logging based on environment variables.
 * Set DEBUG_AUTH=true in your environment to enable auth-related debug logs.
 * Set DEBUG_API=true for API logs, DEBUG_UI=true for UI logs, etc.
 */

/**
 * General debug logging function
 * Logs messages based on category-specific environment variables
 *
 * @param category - Debug category (e.g., 'auth', 'api', 'ui')
 * @param args - Arguments to log
 */
export const debugLog = (category: string, ...args: unknown[]): void => {
  const envVar = `DEBUG_${category.toUpperCase()}`;

  if (typeof process !== 'undefined' && process.env && process.env[envVar] === 'true') {
    console.log(`[${category.toUpperCase()}]`, ...args);
  }
};
