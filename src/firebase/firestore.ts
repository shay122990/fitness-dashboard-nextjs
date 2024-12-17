import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const addWorkout = async (userId: string, workout: string) => {
  try {
    const workoutsRef = collection(db, 'workouts');
    await addDoc(workoutsRef, {
      userId,
      workout,
      createdAt: new Date(),
    });
    console.log('Workout added successfully');
  } catch (error) {
    console.error('Error adding workout:', error);
    throw error;
  }
};

export const getWorkouts = async (userId: string) => {
  try {
    const workoutsRef = collection(db, 'workouts');
    const workoutsSnapshot = await getDocs(workoutsRef);
    const workoutsList = workoutsSnapshot.docs.map(doc => doc.data());
    
    return workoutsList.filter((workout) => workout.userId === userId);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};
