import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NutritionState {
  [key: string]: string[]; 
}

const initialState: NutritionState = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    addCalories: (state, action: PayloadAction<{ day: string; calories: string }>) => {
      state[action.payload.day] = [...(state[action.payload.day] || []), action.payload.calories];
    },
    removeCalories: (state, action: PayloadAction<{ day: string; calories: string }>) => {
      state[action.payload.day] = state[action.payload.day].filter(c => c !== action.payload.calories);
    },
    setNutritionData: (state, action: PayloadAction<NutritionState>) => {
      return action.payload;
    },
  },
});

export const { addCalories, removeCalories, setNutritionData } = nutritionSlice.actions;
export default nutritionSlice.reducer;
