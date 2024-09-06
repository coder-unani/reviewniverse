import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { SETTINGS } from '@/config/settings';

const firebaseConfig = {
  apiKey: SETTINGS.FIREBASE_API_KEY,
  authDomain: SETTINGS.FIREBASE_AUTH_DOMAIN,
  projectId: SETTINGS.FIREBASE_PROJECT_ID,
  storageBucket: SETTINGS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: SETTINGS.FIREBASE_MESSAGING_SENDER_ID,
  appId: SETTINGS.FIREBASE_APP_ID,
  measurementId: SETTINGS.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.addScope('openid');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

export { auth, provider };
