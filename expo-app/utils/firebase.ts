import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider, // For Apple, Microsoft, etc.
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

/**
 * Firebase configuration object
 * Contains all necessary configuration values for initializing Firebase services
 */
const firebaseConfig = {
  /** API key for authenticating requests to Firebase services */
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  /** Domain for Firebase Authentication redirects and popup sign-ins */
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  /** URL for Firebase Realtime Database (optional, only if using Realtime Database) */
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  /** Unique identifier for your Firebase project */
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  /** Storage bucket for Firebase Cloud Storage */
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  /** Sender ID for Firebase Cloud Messaging (FCM) */
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  /** Unique identifier for your Firebase app within the project */
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  /** Measurement ID for Google Analytics integration (optional) */
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
/** Firebase Auth instance for authentication operations */
const auth = getAuth(app);

/**
 * For more information on how to access Firebase in your project,
 * see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
 */

export {
  app as firebaseApp,
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  onAuthStateChanged,
};

/** Default export maintained for backward compatibility */
export default app;
