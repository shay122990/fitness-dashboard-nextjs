import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from './firebase-config';
import { AppDispatch } from '../store'; 

export const googleSignIn = async (dispatch: AppDispatch) => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    console.log('Google Sign-In successful:', user);

    dispatch({
      type: 'auth/setUser',
      payload: {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      }
    });

    return user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};