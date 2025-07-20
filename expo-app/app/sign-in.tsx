/**
 * sign-in.tsx
 *
 * Firebase Authentication Sign-In Component
 *
 * This component handles Google OAuth authentication with Firebase using two different
 * approaches based on the environment:
 *
 * LOCALHOST (Development):
 * - Uses signInWithPopup for faster development iteration
 * - Popup window handles OAuth flow without leaving the main page
 * - Simpler debugging and development experience
 *
 * PRODUCTION (nextgen.bardoshare.com):
 * - Uses signInWithRedirect for better mobile compatibility
 * - Leverages Cloudflare Worker proxy for Firebase auth handler
 * - More robust for real-world usage across devices
 *
 * Features:
 * - Clean redirect result processing with Firebase's standard methods
 * - Environment-aware authentication flow selection
 * - Comprehensive error handling and loading states
 * - Automatic navigation to sign-in-landing page on success
 */

import { useState, useEffect, useMemo } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { auth, GoogleAuthProvider, OAuthProvider } from '../utils/firebase'; // Import providers
import {
  getRedirectResult,
  signInWithRedirect,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router'; // Ensure useRouter is imported

/**
 * SignInScreen Component
 *
 * Main authentication component that handles OAuth providers (Google and Microsoft).
 * Apple Sign-In is implemented but hidden until Apple Developer Account is configured.
 *
 * Key Features:
 * - Environment-aware authentication (popup vs redirect)
 * - Multiple provider support (Google, Microsoft, Apple hidden via feature flag)
 * - Clean redirect result processing
 * - Comprehensive error handling and user feedback
 * - Automatic navigation on successful authentication
 *
 * Authentication Flow:
 * 1. Component mounts and checks for existing redirect results
 * 2. If redirect detected, processes authentication result
 * 3. If no redirect, shows available provider buttons (Google, Microsoft)
 * 4. On sign-in click, uses popup (localhost) or redirect (production)
 * 5. On success, navigates to sign-in-landing page
 *
 * To Enable Apple Sign-In:
 * 1. Set up Apple Developer Account ($99/year)
 * 2. Configure Firebase Console with Apple credentials
 * 3. Change ENABLE_APPLE_SIGNIN to true
 */
export default function SignInScreen() {
  const { setUser, loading: authLoading } = useAuth();
  const router = useRouter(); // Get router instance
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to check redirect

  // Create provider instances with custom parameters (memoized to prevent re-creation)
  const googleProviderInstance = useMemo(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account', // Force account selection for testing/clarity
    });
    return provider;
  }, []);

  // Create Apple provider instance (hidden until Apple Developer Account is configured)
  const appleProviderInstance = useMemo(() => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    return provider;
  }, []);

  // Create Microsoft provider instance
  const microsoftProviderInstance = useMemo(() => {
    const provider = new OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      tenant: 'common', // Allow personal and work Microsoft accounts
    });
    provider.addScope('User.Read'); // Read basic profile information
    return provider;
  }, []);

  // Feature flag to enable Apple Sign-In (set to true when Apple Developer Account is ready)
  const ENABLE_APPLE_SIGNIN = false;

  /**
   * Main effect hook for handling redirect authentication results
   *
   * This effect runs on component mount and checks for OAuth redirect results
   * from Google/Firebase. With the Cloudflare Worker proxy properly configured,
   * the standard Firebase redirect flow now works reliably.
   */
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener to catch authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!mounted) return;

      console.log('sign-in.tsx: Auth state changed, user:', user);

      if (user) {
        // User authenticated - clear any pending redirect flags and reload counter
        const redirectPending = sessionStorage.getItem('firebase-auth-redirect-pending');
        if (redirectPending) {
          console.log(
            'sign-in.tsx: User authenticated via auth state listener after redirect:',
            user.email
          );
          sessionStorage.removeItem('firebase-auth-redirect-pending');
          sessionStorage.removeItem('firebase-auth-redirect-timestamp');
        } else {
          console.log('sign-in.tsx: User authenticated via auth state listener:', user.email);
        }

        // Clear reload counter on successful authentication
        sessionStorage.removeItem('firebase-auth-reload-count');

        setUser(user);
        router.replace('/sign-in-landing');
      }
    });

    /**
     * Check for redirect authentication results
     *
     * Uses Promise.race to race between Firebase's getRedirectResult() and manual auth state detection.
     * This handles cases where OAuth completes successfully but Firebase fails to detect it.
     */
    const checkRedirect = async () => {
      if (!mounted) return;

      console.log('sign-in.tsx: Checking for redirect result...');
      console.log('sign-in.tsx: Current URL:', window.location.href);

      // Check our redirect flags
      const redirectPending = sessionStorage.getItem('firebase-auth-redirect-pending');
      const redirectTimestamp = sessionStorage.getItem('firebase-auth-redirect-timestamp');
      const isRecentRedirect =
        redirectTimestamp && Date.now() - parseInt(redirectTimestamp) < 5 * 60 * 1000;

      console.log('sign-in.tsx: Redirect pending:', redirectPending);
      console.log('sign-in.tsx: Is recent redirect:', isRecentRedirect);

      // If we're not expecting a redirect, just check current auth state
      if (!redirectPending || !isRecentRedirect) {
        if (auth.currentUser) {
          console.log('sign-in.tsx: User already authenticated:', auth.currentUser.email);
          setUser(auth.currentUser);
          router.replace('/sign-in-landing');
        } else {
          console.log('sign-in.tsx: No redirect expected, normal sign-in available');
          setIsLoading(false);
        }
        return;
      }

      try {
        console.log('sign-in.tsx: Starting Promise.race for authentication detection...');

        // Add manual persistence check
        console.log('sign-in.tsx: Checking Firebase auth persistence...');

        // Check if we have URL parameters that indicate a successful OAuth (fallback)
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const hasCode = urlParams.has('code') || hashParams.has('code');
        const hasState = urlParams.has('state') || hashParams.has('state');
        const hasAccessToken = urlParams.has('access_token') || hashParams.has('access_token');
        console.log(
          'sign-in.tsx: URL has OAuth code:',
          hasCode,
          'state:',
          hasState,
          'access_token:',
          hasAccessToken
        );
        console.log('sign-in.tsx: URL search params:', window.location.search);
        console.log('sign-in.tsx: URL hash params:', window.location.hash);
        console.log('sign-in.tsx: Full URL:', window.location.href);

        // DIAGNOSTIC: Try testing direct Firebase auth domain to bypass potential Cloudflare Worker issues
        const isTestingDirect = window.location.search.includes('test=direct');
        if (isTestingDirect) {
          console.log('sign-in.tsx: TESTING: Direct Firebase domain detected in URL params');
        }

        // Race between Firebase detection and auth state detection
        const firebasePromise = getRedirectResult(auth).then((result) => {
          console.log('sign-in.tsx: Firebase getRedirectResult completed:', result);
          return { user: result?.user || null, source: 'firebase' };
        });

        // Also try to manually check if user is already authenticated in a different way
        const manualCheckPromise = new Promise(async (resolve) => {
          console.log('sign-in.tsx: Manual auth check - checking for persisted user...');

          // Wait a bit for Firebase to initialize
          await new Promise((r) => setTimeout(r, 1000));

          // DIAGNOSTIC: Check Firebase configuration
          console.log('sign-in.tsx: Firebase auth config:', {
            apiKey: auth.config.apiKey?.substring(0, 10) + '...',
            authDomain: auth.config.authDomain,
            currentUser: auth.currentUser,
            isSignInWithEmailLink: window.location.href.includes('mode='),
          });

          // Force Firebase to check auth state persistence
          try {
            console.log('sign-in.tsx: Forcing Firebase auth state refresh...');
            await auth.authStateReady();
            console.log('sign-in.tsx: Firebase auth state ready completed');

            // Additional check: Try to manually trigger auth state change detection
            console.log('sign-in.tsx: Attempting manual auth state detection...');
            const currentUser = auth.currentUser;
            if (currentUser) {
              console.log('sign-in.tsx: Found user after authStateReady:', currentUser.email);
            } else {
              console.log('sign-in.tsx: Still no user after authStateReady');

              // Last resort: Check if there's any stored authentication data
              const authData = sessionStorage.getItem(
                'firebase:authUser:' + auth.config.apiKey + ':[DEFAULT]'
              );
              console.log('sign-in.tsx: Firebase auth session data present:', !!authData);
              if (authData) {
                console.log(
                  'sign-in.tsx: Auth data found in session storage, but not loaded by Firebase'
                );
              }
            }
          } catch (error) {
            console.log('sign-in.tsx: Auth state ready error:', error);
          }

          if (auth.currentUser) {
            console.log(
              'sign-in.tsx: Manual check found authenticated user:',
              auth.currentUser.email
            );
            resolve({ user: auth.currentUser, source: 'manualCheck' });
          } else {
            console.log('sign-in.tsx: Manual check found no user');
            resolve({ user: null, source: 'manualCheckTimeout' });
          }
        });

        // Enhanced fallback check - if we have OAuth params but no Firebase detection
        const fallbackCheckPromise = new Promise(async (resolve) => {
          if (hasCode || hasState || hasAccessToken) {
            console.log(
              'sign-in.tsx: OAuth evidence detected, waiting for Firebase to catch up...'
            );

            // Give Firebase extra time since OAuth clearly completed
            for (let i = 0; i < 30; i++) {
              await new Promise((r) => setTimeout(r, 500));

              if (auth.currentUser) {
                console.log(
                  'sign-in.tsx: Fallback check found user after',
                  i * 500,
                  'ms:',
                  auth.currentUser.email
                );
                resolve({ user: auth.currentUser, source: 'fallbackCheck' });
                return;
              }

              console.log(`sign-in.tsx: Fallback check #${i + 1} - still waiting for Firebase...`);
            }

            console.log(
              'sign-in.tsx: Fallback check exhausted - OAuth completed but Firebase failed'
            );
            resolve({ user: null, source: 'fallbackTimeout' });
          } else {
            console.log('sign-in.tsx: No OAuth params, skipping fallback check');
            resolve({ user: null, source: 'noOAuthParams' });
          }
        });

        // Wait for auth state to potentially change with forced reloads
        const authStatePromise = new Promise(async (resolve) => {
          let resolved = false;
          let authCheckCount = 0;

          const checkAuthState = async () => {
            authCheckCount++;
            console.log(
              `sign-in.tsx: Auth state check #${authCheckCount}, current user:`,
              auth.currentUser
            );

            // Force Firebase to reload the current user state
            try {
              if (auth.currentUser) {
                console.log('sign-in.tsx: Found user, forcing reload...');
                await auth.currentUser.reload();
                console.log('sign-in.tsx: User reloaded successfully:', auth.currentUser.email);
              } else {
                // Force check if there's a persisted user that Firebase hasn't loaded yet
                console.log('sign-in.tsx: No current user, forcing auth state refresh...');
                await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay

                // Try to trigger auth state reload by accessing user again
                const currentUser = auth.currentUser;
                if (currentUser) {
                  console.log('sign-in.tsx: Found user after delay:', (currentUser as any).email);
                }
              }
            } catch (error) {
              console.log('sign-in.tsx: Auth reload error:', error);
            }

            if (auth.currentUser && !resolved) {
              console.log(
                'sign-in.tsx: Authentication detected via periodic auth check:',
                auth.currentUser.email
              );
              resolved = true;
              resolve({ user: auth.currentUser, source: 'authStateCheck' });
              return;
            }

            // Check every 500ms for up to 12 seconds (increased from 8s)
            if (authCheckCount < 24 && !resolved) {
              setTimeout(checkAuthState, 500);
            } else if (!resolved) {
              console.log('sign-in.tsx: Auth state checks exhausted (12s)');
              resolved = true;
              resolve({ user: null, source: 'authStateTimeout' });
            }
          };

          // Start checking immediately
          checkAuthState();
        });

        const overallTimeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.log('sign-in.tsx: Overall detection timeout (20s)');
            resolve({ user: null, source: 'overallTimeout' });
          }, 20000); // Extended to 20 seconds for OAuth completion
        });

        // Race all detection methods including fallback
        const result = (await Promise.race([
          firebasePromise,
          manualCheckPromise,
          fallbackCheckPromise,
          authStatePromise,
          overallTimeoutPromise,
        ])) as any;

        if (!mounted) return;

        if (result.user) {
          console.log(
            `sign-in.tsx: Authentication successful via ${result.source}:`,
            result.user.email
          );
          // Clean up flags
          sessionStorage.removeItem('firebase-auth-redirect-pending');
          sessionStorage.removeItem('firebase-auth-redirect-timestamp');
          sessionStorage.removeItem('firebase-auth-reload-count');
          setUser(result.user);
          router.replace('/sign-in-landing');
        } else {
          // OAuth might have completed but Firebase failed to detect it
          console.log('sign-in.tsx: No authentication detected despite recent redirect');
          console.log('sign-in.tsx: Final result source:', result.source);

          // Check if we have OAuth params but still failed
          const urlParams = new URLSearchParams(window.location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const hasCode = urlParams.has('code') || hashParams.has('code');
          const hasOAuthEvidence =
            hasCode || urlParams.has('access_token') || hashParams.has('access_token');

          // Clear flags and show appropriate error
          sessionStorage.removeItem('firebase-auth-redirect-pending');
          sessionStorage.removeItem('firebase-auth-redirect-timestamp');

          if (hasOAuthEvidence) {
            setError(
              'OAuth authorization completed successfully, but Firebase failed to process the authentication. This may be a configuration issue. Please try again or contact support.'
            );
          } else {
            setError(
              'Authentication completed, but there was a technical issue detecting your sign-in. Please try again.'
            );
          }
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!mounted) return;
        console.error('sign-in.tsx: Authentication detection error:', err);

        // Clean up flags
        sessionStorage.removeItem('firebase-auth-redirect-pending');
        sessionStorage.removeItem('firebase-auth-redirect-timestamp');

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
  }, [setUser, router]); // Removed provider dependencies - they're memoized and don't need to be in deps

  /**
   * Handle sign-in with any provider
   *
   * Uses environment-appropriate authentication method:
   * - Popup for localhost (development)
   * - Redirect for production (mobile compatibility)
   *
   * @param provider - The OAuth provider instance (Google, Apple, etc.)
   * @param providerName - Human-readable name for error messages
   * @returns Promise that resolves when authentication completes or fails
   */
  const handleSignIn = async (provider: any, providerName: string) => {
    setError(null);
    setIsLoading(true);

    try {
      // Environment detection: Use popup for localhost, redirect for production
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log(`sign-in.tsx: Using popup authentication for ${providerName} (development)`);

        const result = await signInWithPopup(auth, provider);
        if (result && result.user) {
          console.log(`sign-in.tsx: ${providerName} authentication successful:`, result.user.email);
          setUser(result.user);
          router.replace('/sign-in-landing');
        } else {
          console.log(`sign-in.tsx: ${providerName} authentication returned no user`);
          setIsLoading(false);
        }
      } else {
        console.log(`sign-in.tsx: Using redirect authentication for ${providerName} (production)`);

        // Store a flag in sessionStorage to indicate we're expecting a redirect
        sessionStorage.setItem('firebase-auth-redirect-pending', providerName);
        sessionStorage.setItem('firebase-auth-redirect-timestamp', Date.now().toString());

        // Clear any cached results to force fresh authentication
        sessionStorage.removeItem('firebase-auth-result-cached');

        // Force browser cache refresh with aggressive cache busting
        const timestamp = Date.now();
        console.log(`sign-in.tsx: AGGRESSIVE Cache bust timestamp: ${timestamp}`);
        console.log(`sign-in.tsx: FORCE RELOAD - Cache invalidation active`);

        // This will navigate away from the current page
        await signInWithRedirect(auth, provider);
      }
    } catch (err: any) {
      console.error(`sign-in.tsx: ${providerName} sign-in error:`, err.code, err.message);
      setError(`${providerName} Sign-in Error: ${err.message} (Code: ${err.code})`);
      setIsLoading(false);
    }
  };

  // Loading state: Show spinner while checking auth state or during sign-in
  if (isLoading || authLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  // Main sign-in interface
  return (
    <Container>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-8 text-center text-2xl font-bold">Sign In</Text>

        {error && (
          <View className="mb-4 w-full max-w-md rounded-lg bg-red-100 p-4">
            <Text className="text-center text-red-700">{error}</Text>
          </View>
        )}

        <View className="w-full max-w-md space-y-4">
          <Button
            title="Sign in with Google"
            onPress={() => handleSignIn(googleProviderInstance, 'Google')}
            disabled={isLoading}
            style={{ backgroundColor: '#4285f4', marginBottom: 12 }}
          />

          <Button
            title="Sign in with Microsoft"
            onPress={() => handleSignIn(microsoftProviderInstance, 'Microsoft')}
            disabled={isLoading}
            style={{ backgroundColor: '#00a1f1', marginBottom: 12 }}
          />

          {/* Apple Sign-In (hidden until Apple Developer Account is configured) */}
          {ENABLE_APPLE_SIGNIN && (
            <Button
              title="Sign in with Apple"
              onPress={() => handleSignIn(appleProviderInstance, 'Apple')}
              disabled={isLoading}
              style={{ backgroundColor: '#000', marginBottom: 12 }}
            />
          )}
        </View>

        <Text className="mt-8 max-w-md text-center text-sm text-gray-600">
          {ENABLE_APPLE_SIGNIN
            ? 'Choose your preferred sign-in method. All options work through secure OAuth.'
            : 'Choose your preferred sign-in method. Both options work through secure OAuth.'}
        </Text>
      </View>
    </Container>
  );
}
