/**
 * useRedirectAuth.ts
 *
 * Custom hook for handling OAuth redirect authentication results
 *
 * This hook manages the complex logic of detecting and processing OAuth
 * authentication results after a redirect from providers like Google, Microsoft, etc.
 */

import { useState, useEffect } from 'react';
import { User, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { debugLog } from 'utils/debug';
import { isExpectingRedirect, cleanupRedirectFlags } from './redirect-state';
import { hasOAuthEvidence } from './hasOAuthEvidence';
import { AUTH_STORAGE_KEYS } from './storage-keys';

/**
 * State object returned by the useRedirectAuth hook.
 */
type RedirectAuthState = {
  /** The authenticated user or null if not authenticated */
  user: User | null;
  /** True while checking for redirect results or processing authentication */
  isLoading: boolean;
  /** Error message if authentication fails, null otherwise */
  error: string | null;
};

/**
 * Custom hook for handling OAuth redirect authentication
 *
 * This hook:
 * 1. Checks for existing redirect results on mount
 * 2. Uses multiple detection methods to catch authentication
 * 3. Handles timeout scenarios gracefully
 * 4. Provides comprehensive error handling
 *
 * @returns return.user - The authenticated user or null if not authenticated
 * @returns return.isLoading - True while checking for redirect results or processing authentication
 * @returns return.error - Error message if authentication fails, null otherwise
 */
export const useRedirectAuth = (): RedirectAuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener to catch authentication changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!mounted) return;

      debugLog('auth', 'useRedirectAuth: Auth state changed, user:', authUser);

      if (authUser) {
        // User authenticated - clear any pending redirect flags
        const redirectPending = sessionStorage.getItem(AUTH_STORAGE_KEYS.REDIRECT_PENDING);
        if (redirectPending) {
          debugLog(
            'auth',
            'useRedirectAuth: User authenticated via auth state listener after redirect:',
            authUser.email
          );
        } else {
          debugLog(
            'auth',
            'useRedirectAuth: User authenticated via auth state listener:',
            authUser.email
          );
        }

        cleanupRedirectFlags();
        setUser(authUser);
        setIsLoading(false);
      }
    });

    /**
     * Check for redirect authentication results using multiple detection methods
     */
    const checkRedirect = async () => {
      if (!mounted) return;

      debugLog('auth', 'useRedirectAuth: Checking for redirect result...');
      debugLog('auth', 'useRedirectAuth: Current URL:', window.location.href);

      const expectingRedirect = isExpectingRedirect();
      debugLog('auth', 'useRedirectAuth: Expecting redirect:', expectingRedirect);

      // If we're not expecting a redirect, just check current auth state
      if (!expectingRedirect) {
        if (auth.currentUser) {
          debugLog('auth', 'useRedirectAuth: User already authenticated:', auth.currentUser.email);
          setUser(auth.currentUser);
        } else {
          debugLog('auth', 'useRedirectAuth: No redirect expected, normal sign-in available');
        }
        setIsLoading(false);
        return;
      }

      try {
        debugLog('auth', 'useRedirectAuth: Starting Promise.race for authentication detection...');

        // Primary Firebase detection method
        const firebasePromise = getRedirectResult(auth).then((result) => {
          debugLog('auth', 'useRedirectAuth: Firebase getRedirectResult completed:', result);
          return { user: result?.user || null, source: 'firebase' };
        });

        // Manual authentication check
        const manualCheckPromise = new Promise(async (resolve) => {
          debugLog('auth', 'useRedirectAuth: Manual auth check - checking for persisted user...');

          // Wait for Firebase to initialize
          await new Promise((r) => setTimeout(r, 1000));

          debugLog('auth', 'useRedirectAuth: Firebase auth config:', {
            apiKey: auth.config.apiKey?.substring(0, 10) + '...',
            authDomain: auth.config.authDomain,
            currentUser: auth.currentUser,
          });

          try {
            debugLog('auth', 'useRedirectAuth: Forcing Firebase auth state refresh...');
            await auth.authStateReady();
            debugLog('auth', 'useRedirectAuth: Firebase auth state ready completed');

            const currentUser = auth.currentUser;
            if (currentUser) {
              debugLog(
                'auth',
                'useRedirectAuth: Found user after authStateReady:',
                currentUser.email
              );
            } else {
              debugLog('auth', 'useRedirectAuth: Still no user after authStateReady');

              // Check for stored authentication data
              const authData = sessionStorage.getItem(
                'firebase:authUser:' + auth.config.apiKey + ':[DEFAULT]'
              );
              debugLog('auth', 'useRedirectAuth: Firebase auth session data present:', !!authData);
            }
          } catch (error) {
            debugLog('auth', 'useRedirectAuth: Auth state ready error:', error);
          }

          if (auth.currentUser) {
            debugLog(
              'auth',
              'useRedirectAuth: Manual check found authenticated user:',
              auth.currentUser.email
            );
            resolve({ user: auth.currentUser, source: 'manualCheck' });
          } else {
            debugLog('auth', 'useRedirectAuth: Manual check found no user');
            resolve({ user: null, source: 'manualCheckTimeout' });
          }
        });

        // Enhanced fallback check for OAuth evidence
        const fallbackCheckPromise = new Promise(async (resolve) => {
          const oauthEvidence = hasOAuthEvidence();

          if (oauthEvidence) {
            debugLog(
              'auth',
              'useRedirectAuth: OAuth evidence detected, waiting for Firebase to catch up...'
            );

            // Give Firebase extra time since OAuth clearly completed
            for (let i = 0; i < 30; i++) {
              await new Promise((r) => setTimeout(r, 500));

              if (auth.currentUser) {
                debugLog(
                  'auth',
                  'useRedirectAuth: Fallback check found user after',
                  i * 500,
                  'ms:',
                  auth.currentUser.email
                );
                resolve({ user: auth.currentUser, source: 'fallbackCheck' });
                return;
              }

              debugLog(
                'auth',
                `useRedirectAuth: Fallback check #${i + 1} - still waiting for Firebase...`
              );
            }

            debugLog(
              'auth',
              'useRedirectAuth: Fallback check exhausted - OAuth completed but Firebase failed'
            );
            resolve({ user: null, source: 'fallbackTimeout' });
          } else {
            debugLog('auth', 'useRedirectAuth: No OAuth params, skipping fallback check');
            resolve({ user: null, source: 'noOAuthParams' });
          }
        });

        // Periodic auth state check
        const authStatePromise = new Promise(async (resolve) => {
          let resolved = false;
          let authCheckCount = 0;

          const checkAuthState = async () => {
            authCheckCount++;
            debugLog(
              'auth',
              `useRedirectAuth: Auth state check #${authCheckCount}, current user:`,
              auth.currentUser
            );

            try {
              if (auth.currentUser) {
                debugLog('auth', 'useRedirectAuth: Found user, forcing reload...');
                await auth.currentUser.reload();
                debugLog(
                  'auth',
                  'useRedirectAuth: User reloaded successfully:',
                  auth.currentUser.email
                );
              } else {
                debugLog('auth', 'useRedirectAuth: No current user, forcing auth state refresh...');
                await new Promise<void>((resolve) => setTimeout(resolve, 100));

                const currentUser = auth.currentUser;
                if (currentUser) {
                  debugLog(
                    'auth',
                    'useRedirectAuth: Found user after delay:',
                    (currentUser as any).email
                  );
                }
              }
            } catch (error) {
              debugLog('auth', 'useRedirectAuth: Auth reload error:', error);
            }

            if (auth.currentUser && !resolved) {
              debugLog(
                'auth',
                'useRedirectAuth: Authentication detected via periodic auth check:',
                auth.currentUser.email
              );
              resolved = true;
              resolve({ user: auth.currentUser, source: 'authStateCheck' });
              return;
            }

            // Check every 500ms for up to 12 seconds
            if (authCheckCount < 24 && !resolved) {
              setTimeout(checkAuthState, 500);
            } else if (!resolved) {
              debugLog('auth', 'useRedirectAuth: Auth state checks exhausted (12s)');
              resolved = true;
              resolve({ user: null, source: 'authStateTimeout' });
            }
          };

          checkAuthState();
        });

        // Overall timeout
        const overallTimeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            debugLog('auth', 'useRedirectAuth: Overall detection timeout (20s)');
            resolve({ user: null, source: 'overallTimeout' });
          }, 20000);
        });

        // Race all detection methods
        const result = (await Promise.race([
          firebasePromise,
          manualCheckPromise,
          fallbackCheckPromise,
          authStatePromise,
          overallTimeoutPromise,
        ])) as any;

        if (!mounted) return;

        if (result.user) {
          debugLog(
            'auth',
            `useRedirectAuth: Authentication successful via ${result.source}:`,
            result.user.email
          );
          cleanupRedirectFlags();
          setUser(result.user);
        } else {
          debugLog('auth', 'useRedirectAuth: No authentication detected despite recent redirect');
          debugLog('auth', 'useRedirectAuth: Final result source:', result.source);

          cleanupRedirectFlags();

          const oauthEvidence = hasOAuthEvidence();
          if (oauthEvidence) {
            setError(
              'OAuth authorization completed successfully, but Firebase failed to process the authentication. This may be a configuration issue. Please try again or contact support.'
            );
          } else {
            setError(
              'Authentication completed, but there was a technical issue detecting your sign-in. Please try again.'
            );
          }
        }
        setIsLoading(false);
      } catch (err: any) {
        if (!mounted) return;
        debugLog('auth', 'useRedirectAuth: Authentication detection error:', err);

        cleanupRedirectFlags();
        setError(`Authentication Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    // Check for redirect result immediately on mount
    checkRedirect();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { user, isLoading, error };
};
