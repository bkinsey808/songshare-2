import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../components/AuthContext'; // Import AuthProvider

export default function Layout() {
  return (
    <AuthProvider>
      {/* Ensure GestureHandlerRootView is at the root for gesture handling */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="details" options={{ title: 'Details' }} />
          <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
          <Stack.Screen name="sign-in-landing" options={{ title: 'Welcome' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
