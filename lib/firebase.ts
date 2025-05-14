import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

// Ensure we have the required configuration
const extra = Constants.expoConfig?.extra;
if (!extra?.firebaseApiKey) {
  throw new Error('Firebase configuration is missing. Please check your app.config.js');
}

const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId
};

// Initialize Firebase only if we have valid config
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);