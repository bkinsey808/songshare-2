/**
 * sign-in.tsx
 *
 * Firebase Authentication Sign-In Page
 *
 * This page handles Google OAuth authentication with Firebase using two different
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

import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { PROVIDERS, ENABLE_APPLE_SIGNIN } from 'features/auth/signIn/providers';
import { useSignInPage } from 'features/auth/signIn/useSignInPage';

/**
 * SignInPage Component
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
 * 3. Change ENABLE_APPLE_SIGNIN to true in features/auth/signIn/providers.ts
 */
export default function SignInPage() {
  // Use the comprehensive sign-in page hook
  const { isLoading, error, providers, signIn } = useSignInPage();

  // Loading state: Show spinner while checking auth state or during sign-in
  if (isLoading) {
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
            title={`Sign in with ${PROVIDERS.google.name}`}
            onPress={() => signIn(providers.google, PROVIDERS.google.name)}
            disabled={isLoading}
            style={{ backgroundColor: PROVIDERS.google.color, marginBottom: 12 }}
          />

          <Button
            title={`Sign in with ${PROVIDERS.microsoft.name}`}
            onPress={() => signIn(providers.microsoft, PROVIDERS.microsoft.name)}
            disabled={isLoading}
            style={{ backgroundColor: PROVIDERS.microsoft.color, marginBottom: 12 }}
          />

          {/* Apple Sign-In (hidden until Apple Developer Account is configured) */}
          {ENABLE_APPLE_SIGNIN && (
            <Button
              title={`Sign in with ${PROVIDERS.apple.name}`}
              onPress={() => signIn(providers.apple, PROVIDERS.apple.name)}
              disabled={isLoading}
              style={{ backgroundColor: PROVIDERS.apple.color, marginBottom: 12 }}
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
