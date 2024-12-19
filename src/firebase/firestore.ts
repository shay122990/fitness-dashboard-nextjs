import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

// Define the WorkoutDetail type
export interface WorkoutDetail {
  workout: string;
  sets: number;
  reps: number;
  weight: number;
}

// Save a workout for a specific user
export const saveWorkout = async (userId: string, day: string, workout: WorkoutDetail) => {
  try {
    const workoutsRef = collection(db, "workouts");
    await addDoc(workoutsRef, {
      userId,
      day,
      workout: workout.workout,
      sets: workout.sets,
      reps: workout.reps,
      weight: workout.weight,
      createdAt: new Date(),
    });
    console.log("Workout saved successfully!");
  } catch (error) {
    console.error("Error saving workout:", error);
  }
};

// Fetch all workouts for a specific user
export const fetchUserWorkouts = async (userId: string) => {
  try {
    const workoutsRef = collection(db, "workouts");
    const q = query(workoutsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userWorkouts: { [key: string]: WorkoutDetail[] } = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const workoutDetail: WorkoutDetail = {
        workout: data.workout,
        sets: data.sets,
        reps: data.reps,
        weight: data.weight,
      };
      
      if (!userWorkouts[data.day]) {
        userWorkouts[data.day] = [];
      }
      userWorkouts[data.day].push(workoutDetail);
    });

    return userWorkouts;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return null;
  }
};

// Save a calorie entry for a specific user
export const saveCalories = async (userId: string, day: string, calories: string) => {
  try {
    const caloriesRef = collection(db, 'calories');
    await addDoc(caloriesRef, {
      userId,
      day,
      calories,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving calories:', error);
  }
};

// Fetch all calorie entries for a specific user
export const fetchUserCalories = async (userId: string) => {
  try {
    const caloriesRef = collection(db, 'calories');
    const q = query(caloriesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const userCalories: { [key: string]: string[] } = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!userCalories[data.day]) {
        userCalories[data.day] = [];
      }
      userCalories[data.day].push(data.calories);
    });

    return userCalories;
  } catch (error) {
    console.error('Error fetching calories:', error);
    return null;
  }
};
