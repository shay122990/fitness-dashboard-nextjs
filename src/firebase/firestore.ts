import { collection, addDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
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
    console.log("Workout saved successfully!");
  } catch (error) {
    console.error("Error saving workout:", error);
  }
};
// Remove a workout from Firestore
export const removeWorkoutFromFirestore = async (userId: string, day: string, workout: string) => {
  try {
    const workoutsRef = query(
      collection(db, "workouts"),
      where("userId", "==", userId),
      where("day", "==", day),
      where("workout", "==", workout)
    );
    const querySnapshot = await getDocs(workoutsRef);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Workout removed successfully from Firestore!");
  } catch (error) {
    console.error("Error removing workout:", error);
    throw error;
  }
};

// Update workout for a specific user
export const updateWorkoutInFirestore = async (userId: string, day: string, oldWorkout: string, newWorkout: string) => {
  try {
    const workoutsRef = query(
      collection(db, "workouts"),
      where("userId", "==", userId),
      where("day", "==", day),
      where("workout", "==", oldWorkout)
    );
    const querySnapshot = await getDocs(workoutsRef);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { workout: newWorkout });
    });

    await batch.commit();
    console.log("Workout updated successfully in Firestore!");
  } catch (error) {
    console.error("Error updating workout:", error);
    throw error;
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

// Save a calorie entry for a specific user
export const saveCalorieEntry = async (userId: string, day: string, calories: string, type: "eaten" | "burned") => {
  try {
    const caloriesRef = collection(db, "calories");
    await addDoc(caloriesRef, {
      userId,
      day,
      calories,
      type,
      createdAt: new Date(),
    });
    console.log("Calorie entry saved successfully!");
  } catch (error) {
    console.error("Error saving calorie entry:", error);
    throw error;
  }
};

// Fetch all calorie entries for a specific user
export const fetchCalorieEntries = async (userId: string) => {
  try {
    const caloriesRef = collection(db, "calories");
    const q = query(caloriesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userCalories: {
      [key: string]: {
        eaten: string[];
        burned: string[];
      };
    } = {
      Monday: { eaten: [], burned: [] },
      Tuesday: { eaten: [], burned: [] },
      Wednesday: { eaten: [], burned: [] },
      Thursday: { eaten: [], burned: [] },
      Friday: { eaten: [], burned: [] },
      Saturday: { eaten: [], burned: [] },
      Sunday: { eaten: [], burned: [] },
    };

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const day = data.day as keyof typeof userCalories;
      const type = data.type as "eaten" | "burned";

      if (userCalories[day] && userCalories[day][type]) {
        userCalories[day][type].push(data.calories);
      }
    });

    return userCalories;
  } catch (error) {
    console.error("Error fetching calorie entries:", error);
    return null;
  }
};
// Remove a calorie entry from Firestore
export const removeCalorieEntry = async (userId: string, day: string, calories: string, type: "eaten" | "burned") => {
  try {
    const calorieRef = query(
      collection(db, "calories"),
      where("userId", "==", userId),
      where("day", "==", day),
      where("calories", "==", calories),
      where("type", "==", type)
    );
    const querySnapshot = await getDocs(calorieRef);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Calorie entry removed successfully from Firestore!");
  } catch (error) {
    console.error("Error removing calorie entry:", error);
    throw error;
  }
};