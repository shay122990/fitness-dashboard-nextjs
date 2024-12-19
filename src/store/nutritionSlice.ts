import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NutritionState {
  [key: string]: {
    eaten: string[];
    burned: string[];
  };
}

const initialState: NutritionState = {
  Monday: { eaten: [], burned: [] },
  Tuesday: { eaten: [], burned: [] },
  Wednesday: { eaten: [], burned: [] },
  Thursday: { eaten: [], burned: [] },
  Friday: { eaten: [], burned: [] },
  Saturday: { eaten: [], burned: [] },
  Sunday: { eaten: [], burned: [] },
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    addCalories: (state, action: PayloadAction<{ day: string; calories: string; type: "eaten" | "burned" }>) => {
      state[action.payload.day][action.payload.type] = [
        ...(state[action.payload.day][action.payload.type] || []),
        action.payload.calories,
      ];
    },
    removeCalories: (state, action: PayloadAction<{ day: string; calories: string; type: "eaten" | "burned" }>) => {
      state[action.payload.day][action.payload.type] = state[action.payload.day][action.payload.type].filter(
        (calorie) => calorie !== action.payload.calories
      );
    },
    setNutritionData: (state, action: PayloadAction<NutritionState>) => {
      return action.payload;
    },
  },
});

export const { addCalories, removeCalories, setNutritionData } = nutritionSlice.actions;
export default nutritionSlice.reducer;
