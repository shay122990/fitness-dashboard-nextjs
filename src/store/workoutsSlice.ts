import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutsState {
  [key: string]: string[];
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
    addWorkout: (state, action: PayloadAction<{ day: string; workout: string }>) => {
      state[action.payload.day] = [...(state[action.payload.day] || []), action.payload.workout];
    },
    removeWorkout: (state, action: PayloadAction<{ day: string; workout: string }>) => {
      state[action.payload.day] = state[action.payload.day].filter(w => w !== action.payload.workout);
    },
    setWorkouts: (state, action: PayloadAction<WorkoutsState>) => {
      return action.payload;
    },
  },
});

export const { addWorkout, removeWorkout, setWorkouts } = workoutsSlice.actions;
export default workoutsSlice.reducer;
