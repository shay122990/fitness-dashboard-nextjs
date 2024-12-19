import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutDetail {
  workout: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutsState {
  [key: string]: WorkoutDetail[];
}

const initialState: WorkoutsState = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<{ day: string; workout: WorkoutDetail }>) => {
      state[action.payload.day] = [
        ...(state[action.payload.day] || []),
        action.payload.workout,
      ];
    },
    removeWorkout: (state, action: PayloadAction<{ day: string; workout: string }>) => {
      state[action.payload.day] = state[action.payload.day].filter(
        (workout) => workout.workout !== action.payload.workout
      );
    },
    setWorkouts: (state, action: PayloadAction<WorkoutsState>) => {
      return action.payload;
    },
  },
});

export const { addWorkout, removeWorkout, setWorkouts } = workoutsSlice.actions;
export default workoutsSlice.reducer;
