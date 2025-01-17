import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { daysOfWeek } from "@/app/utils/days"; 

interface WorkoutsState {
  [key: string]: string[];
}
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
    updateWorkout: (state, action: PayloadAction<{ day: string; oldWorkout: string; newWorkout: string }>) => { 
      state[action.payload.day] = state[action.payload.day].map(w => w === action.payload.oldWorkout ? action.payload.newWorkout : w );
    },
  },
});

export const { addWorkout, removeWorkout, setWorkouts, updateWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;
