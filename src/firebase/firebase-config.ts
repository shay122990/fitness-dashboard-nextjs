import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGJcLMp8YCvDLFigYWKhHp65haPDJ1y1w",
    authDomain: "today-fitnessapp.firebaseapp.com",
    projectId: "today-fitnessapp",
    storageBucket: "today-fitnessapp.firebasestorage.app",
    messagingSenderId: "245176161220",
    appId: "1:245176161220:web:bf877060a25deb62720a91"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
