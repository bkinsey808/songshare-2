import { Stack, Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { ScreenContent } from 'components/ScreenContent';
import { useAuth } from 'features/auth/useAuth';
import { debugLog } from 'utils/debug';

export default function Home() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      debugLog('auth', 'Error signing out:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container className="bg-blue-500 p-4">
        {user && (
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">
              Hello, {user.displayName || user.email || 'User'}!
            </Text>
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        )}
        <ScreenContent path="app/index.tsx" title="Home"></ScreenContent>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
        {!user && (
          <Link href="/sign-in" asChild>
            <Button title="Sign In" />
          </Link>
        )}
      </Container>
    </>
  );
}
