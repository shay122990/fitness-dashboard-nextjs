import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from './firebase-config'; 

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider); 
    const user = result.user;
    console.log('Google Sign-In successful:', user);
    return user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};
