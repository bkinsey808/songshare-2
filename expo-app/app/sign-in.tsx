import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { auth, GoogleAuthProvider } from '../utils/firebase'; // Import GoogleAuthProvider
import { getRedirectResult, signInWithRedirect, signInWithPopup } from 'firebase/auth'; // Revert to signInWithRedirect
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router'; // Ensure useRouter is imported

export default function SignInScreen() {
  const { user, setUser, loading: authLoading } = useAuth();
  const router = useRouter(); // Get router instance
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to check redirect

  // Create an instance of the GoogleAuthProvider
  const googleProviderInstance = new GoogleAuthProvider();
  googleProviderInstance.setCustomParameters({
    prompt: 'select_account', // To force account selection, just for testing
  });

  useEffect(() => {
    const checkRedirect = async () => {
      console.log('sign-in.tsx: useEffect running. About to call getRedirectResult(auth)...');
      console.log('sign-in.tsx: Current URL:', window.location.href);
      console.log('sign-in.tsx: URL search params:', window.location.search);

      // Check sessionStorage for Firebase auth state
      console.log('sign-in.tsx: Checking sessionStorage...');
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.includes('firebase')) {
          console.log(`sign-in.tsx: sessionStorage[${key}]:`, sessionStorage.getItem(key));
        }
      }

      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.log('sign-in.tsx: Timeout reached, stopping loading state');
        setIsLoading(false);
      }, 10000); // Increased to 10 seconds

      try {
        console.log('sign-in.tsx: Calling getRedirectResult...');
        const result = await getRedirectResult(auth);
        clearTimeout(timeoutId);
        console.log('sign-in.tsx: getRedirectResult promise resolved. Result:', result);
        console.log('sign-in.tsx: Result type:', typeof result);
        console.log('sign-in.tsx: Result keys:', result ? Object.keys(result) : 'null');

        if (result && result.user) {
          console.log(
            'sign-in.tsx: User found from redirect:',
            result.user.uid,
            result.user.displayName,
            result.user.email
          );
          setUser(result.user); // Update auth context
          console.log('sign-in.tsx: Navigating to / after successful redirect sign-in.');
          router.replace('/');
        } else {
          console.log(
            'sign-in.tsx: No user found from redirect (result is null or no user property). Page is ready for new sign-in attempt.'
          );
          setIsLoading(false); // Stop loading, show sign-in button
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        console.error('sign-in.tsx: Error during getRedirectResult:', err);
        console.error('sign-in.tsx: Error code:', err.code);
        console.error('sign-in.tsx: Error message:', err.message);
        console.error('sign-in.tsx: Error stack:', err.stack);
        setError(`Redirect Error: ${err.message} (Code: ${err.code})`);
        setIsLoading(false); // Stop loading on error
      }
    };

    checkRedirect();
  }, [setUser, router]); // Added router to dependency array

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true); // Show loading while redirecting
    try {
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log('sign-in.tsx: Initiating sign-in with POPUP (localhost)...');
        const result = await signInWithPopup(auth, googleProviderInstance);
        if (result && result.user) {
          setUser(result.user);
          router.replace('/');
        } else {
          setIsLoading(false);
        }
      } else {
        console.log('sign-in.tsx: Initiating sign-in with REDIRECT...');
        await signInWithRedirect(auth, googleProviderInstance);
      }
    } catch (err: any) {
      console.error('sign-in.tsx: Error during sign-in:', err.code, err.message, err);
      setError(`Sign-in Error: ${err.message} (Code: ${err.code})`);
      setIsLoading(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign In</Text>
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>Error: {error}</Text>}
      <Button title="Sign in with Google" onPress={handleSignIn} disabled={isLoading} />
    </Container>
  );
}
