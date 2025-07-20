/**
 * multi-provider-sign-in.tsx (EXAMPLE)
 *
 * Example implementation showing how to extend the current authentication system
 * to support multiple OAuth providers. This demonstrates how the Cloudflare Worker
 * proxy enables all Firebase-supported OAuth providers to work seamlessly.
 *
 * SUPPORTED PROVIDERS:
 * - Google (already implemented)
 * - Facebook
 * - Twitter/X
 * - GitHub
 * - Microsoft
 * - Apple
 *
 * The Cloudflare Worker proxy handles all provider redirects through the same
 * `/__/auth/*` endpoints, making this approach provider-agnostic.
 */

import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from '../utils/firebase';
import { getRedirectResult, signInWithRedirect, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';

/**
 * Provider configuration type
 */
type ProviderConfig = {
  name: string;
  color: string;
  provider: any;
  customParams?: Record<string, any>;
};

/**
 * Multi-Provider SignIn Component
 *
 * Demonstrates how to implement multiple OAuth providers using the same
 * Cloudflare Worker proxy infrastructure that currently handles Google Auth.
 */
export default function MultiProviderSignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user: contextUser } = useAuth();

  /**
   * PROVIDER CONFIGURATIONS
   *
   * Each provider can be configured with custom parameters.
   * All of these will work through the same Cloudflare Worker proxy.
   */
  const providers: ProviderConfig[] = [
    {
      name: 'Google',
      color: '#4285f4',
      provider: (() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return provider;
      })(),
    },
    {
      name: 'Facebook',
      color: '#1877f2',
      provider: (() => {
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({ display: 'popup' });
        return provider;
      })(),
    },
    {
      name: 'Twitter',
      color: '#1da1f2',
      provider: new TwitterAuthProvider(),
    },
    {
      name: 'GitHub',
      color: '#333',
      provider: (() => {
        const provider = new GithubAuthProvider();
        provider.addScope('user:email'); // Request email access
        return provider;
      })(),
    },
    {
      name: 'Microsoft',
      color: '#00a1f1',
      provider: (() => {
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
          tenant: 'common', // Allow personal and work accounts
        });
        provider.addScope('User.Read');
        return provider;
      })(),
    },
    {
      name: 'Apple',
      color: '#000',
      provider: (() => {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        return provider;
      })(),
    },
  ];

  /**
   * Check for redirect results on component mount
   *
   * This works the same for all providers because they all use
   * the same Firebase auth infrastructure that our Worker proxies.
   */
  useEffect(() => {
    let mounted = true;

    const checkRedirect = async () => {
      if (!mounted) return;

      const timeoutId = setTimeout(() => {
        if (!mounted) return;
        console.log('Multi-provider: Authentication timeout reached');
        setIsLoading(false);
      }, 10000);

      try {
        const result = await getRedirectResult(auth);

        if (!mounted) return;
        clearTimeout(timeoutId);

        if (result && result.user) {
          console.log('Multi-provider: Authentication successful:', {
            provider: result.providerId,
            user: result.user.displayName || result.user.email,
          });
          router.replace('/sign-in-landing');
        } else {
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!mounted) return;
        clearTimeout(timeoutId);
        console.error('Multi-provider: Authentication error:', err);
        setError(`Authentication Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkRedirect, 1000);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  /**
   * Handle sign-in with any provider
   *
   * Uses environment-aware authentication:
   * - Popup for localhost (faster development)
   * - Redirect for production (better mobile support)
   */
  const handleSignIn = async (providerConfig: ProviderConfig) => {
    setError(null);
    setIsLoading(true);

    try {
      const isLocalhost = window?.location?.hostname === 'localhost';

      if (isLocalhost) {
        // Development: Use popup for faster iteration
        console.log(`Multi-provider: Starting ${providerConfig.name} popup sign-in`);
        const result = await signInWithPopup(auth, providerConfig.provider);
        if (result.user) {
          router.replace('/sign-in-landing');
        }
      } else {
        // Production: Use redirect (works through Cloudflare Worker proxy)
        console.log(`Multi-provider: Starting ${providerConfig.name} redirect sign-in`);
        await signInWithRedirect(auth, providerConfig.provider);
        // Note: redirect will navigate away, so loading state continues
      }
    } catch (err: any) {
      console.error(`Multi-provider: ${providerConfig.name} sign-in error:`, err);
      setError(`${providerConfig.name} Sign-In Error: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Redirect to home if already authenticated
  if (contextUser) {
    router.replace('/');
    return null;
  }

  return (
    <Container>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-8 text-center text-2xl font-bold">Choose Your Sign-In Method</Text>

        {error && (
          <View className="mb-4 w-full max-w-md rounded-lg bg-red-100 p-4">
            <Text className="text-center text-red-700">{error}</Text>
          </View>
        )}

        {isLoading ? (
          <View className="items-center">
            <ActivityIndicator size="large" />
            <Text className="mt-2 text-gray-600">Processing authentication...</Text>
          </View>
        ) : (
          <View className="w-full max-w-md space-y-4">
            {providers.map((providerConfig) => (
              <Button
                key={providerConfig.name}
                title={`Sign in with ${providerConfig.name}`}
                onPress={() => handleSignIn(providerConfig)}
                style={{
                  backgroundColor: providerConfig.color,
                  marginBottom: 12,
                }}
              />
            ))}
          </View>
        )}

        <Text className="mt-8 max-w-md text-center text-sm text-gray-600">
          All providers work through the same Cloudflare Worker proxy that handles Firebase
          authentication endpoints.
        </Text>
      </View>
    </Container>
  );
}

/**
 * FIREBASE CONSOLE SETUP REQUIRED:
 *
 * To use additional providers, you'll need to enable them in Firebase Console:
 *
 * 1. Go to Firebase Console → Authentication → Sign-in method
 * 2. Enable each provider you want to use
 * 3. Configure OAuth credentials:
 *    - Google: Already configured
 *    - Facebook: Need Facebook App ID/Secret
 *    - Twitter: Need Twitter API Key/Secret
 *    - GitHub: Need GitHub OAuth App Client ID/Secret
 *    - Microsoft: Need Azure AD Application ID
 *    - Apple: Need Apple Developer Account setup
 *
 * 4. Add authorized domains:
 *    - Add your Cloudflare Pages domain (nextgen.bardoshare.com)
 *    - Add localhost for development
 *
 * CLOUDFLARE WORKER:
 * No changes needed! The existing worker handles all Firebase auth endpoints
 * regardless of which OAuth provider is used.
 */
