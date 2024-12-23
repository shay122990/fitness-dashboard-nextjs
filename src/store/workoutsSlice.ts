import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutsState } from "@/app/types/workoutTypes";
import { daysOfWeek } from "@/app/utils/days"; 

const initialState: WorkoutsState = daysOfWeek.reduce((state, day) => {
  state[day] = [];
  return state;
}, {} as WorkoutsState);

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
