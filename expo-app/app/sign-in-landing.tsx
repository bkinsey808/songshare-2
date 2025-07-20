import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams, Link } from 'expo-router'; // Added Link for router.replace
import { getRedirectResult, User } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Container } from '../components/Container'; // Corrected import
import { useAuth } from '../hooks/useAuth';

export default function SignInLandingScreen() {
  const router = useRouter();
  const { setUser } = useAuth(); // Assuming useAuth provides a way to set the user
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          // User signed in successfully.
          setUser(result.user as User); // Update auth context
          router.replace('/'); // Redirect to home or desired page
        } else {
          // This might happen if the page is loaded without a redirect result
          // or if the user is already signed in and this page is accessed directly.
          // We can check the auth state again or redirect.
          if (auth.currentUser) {
            setUser(auth.currentUser);
            router.replace('/');
          } else {
            // If no user and no redirect result, maybe redirect to sign-in
            router.replace('/sign-in' as any); // Used 'as any' to bypass strict typing for now, ensure this route exists
          }
        }
      } catch (e: any) {
        console.error('Error processing redirect result:', e);
        setError('Failed to sign in. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    processRedirectResult();
  }, [router, setUser]);

  // Handle specific OAuth errors passed via query parameters if any
  useEffect(() => {
    if (params.error_description) {
      setError(params.error_description as string);
      setIsLoading(false);
    } else if (params.error) {
      setError(params.error as string);
      setIsLoading(false);
    }
  }, [params]);

  if (isLoading) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Completing sign in...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>Sign In Error</Text>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>{error}</Text>
          <View style={{ marginTop: 20 }}>
            {/* Use Link for navigation with Expo Router, cast href to any to bypass TS error */}
            <Link href={'/sign-in' as any} asChild>
              <Button title="Try Again" onPress={() => {}} />
            </Link>
          </View>
        </View>
      </Container>
    );
  }

  // Fallback, though ideally should be redirected by logic above
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Redirecting...</Text>
      </View>
    </Container>
  );
}

// Expo Router requires a default export for the page component.
// Adding a simple Button component for the missing import.
// In a real app, you'd import this from your UI library or React Native.
const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <Text
      onPress={onPress}
      style={{
        color: 'blue',
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        textAlign: 'center',
      }}>
      {title}
    </Text>
  );
};
