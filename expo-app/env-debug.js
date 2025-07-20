// Debug environment variables during Expo build
console.log('=== EXPO ENV DEBUG ===');
console.log('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:', process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log(
  'EXPO_PUBLIC_FIREBASE_API_KEY:',
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...'
);

export const envDebug = {
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
};
