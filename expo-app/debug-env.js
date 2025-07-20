// Debug script to check environment variables
console.log('Environment variables debug:');
console.log('EXPO_PUBLIC_FIREBASE_API_KEY:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
console.log('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:', process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log('EXPO_PUBLIC_PROJECT_ID:', process.env.EXPO_PUBLIC_PROJECT_ID);
console.log(
  'All process.env keys:',
  Object.keys(process.env).filter((key) => key.startsWith('EXPO_PUBLIC'))
);
