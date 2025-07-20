import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '../components/Container';
import { useAuth } from '../features/auth/useAuth';
import { Button } from '../components/Button';
import { debugLog } from '../utils/debug';

export default function SignInLandingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Just check if user is already authenticated (no redirect processing needed)
    if (user) {
      debugLog('auth', 'sign-in-landing.tsx: User is authenticated:', user.uid, user.displayName);
      setIsLoading(false);
    } else {
      // If no user, redirect back to sign-in
      debugLog('auth', 'sign-in-landing.tsx: No user found, redirecting to sign-in');
      router.replace('/sign-in');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome!</Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Sign in successful</Text>
        <Text style={{ marginBottom: 20 }}>Hello, {user.displayName}!</Text>

        <Button title="Continue to App" onPress={() => router.replace('/')} />
      </View>
    </Container>
  );
}
