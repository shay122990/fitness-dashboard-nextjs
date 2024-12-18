import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

// Save a workout for a specific user
export const saveWorkout = async (userId: string, day: string, workout: string) => {
  try {
    const workoutsRef = collection(db, "workouts");
    await addDoc(workoutsRef, {
      userId,
      day,
      workout,
      createdAt: new Date(),
    });
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

    const userWorkouts: { [key: string]: string[] } = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!userWorkouts[data.day]) {
        userWorkouts[data.day] = [];
      }
      userWorkouts[data.day].push(data.workout);
    });

    return userWorkouts;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return null;
  }
};
