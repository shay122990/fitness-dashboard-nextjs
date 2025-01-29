import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { daysOfWeek } from '@/app/utils/days'; 

interface NutritionState {
  [key: string]: {
    eaten: string[];
    burned: string[];
  };
}

const initialState: NutritionState = daysOfWeek.reduce((state, day) => {
  state[day] = { eaten: [], burned: [] };
  return state;
}, {} as NutritionState);

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
    //optional slice for future actions
    removeCalories: (state, action: PayloadAction<{ day: string; calories: string; type: "eaten" | "burned" }>) => {
      state[action.payload.day][action.payload.type] = state[action.payload.day][action.payload.type].filter(
        (calorie) => calorie !== action.payload.calories
      );
    },
    clearCalories: (state, action: PayloadAction<{ day: string }>) => {
      state[action.payload.day].eaten = [];
      state[action.payload.day].burned = [];
    },
    setNutritionData: (state, action: PayloadAction<NutritionState>) => {
      return action.payload;
    },
    updateCalories: (
      state,
      action: PayloadAction<{ day: string; oldCalories: string; newCalories: string; type: "eaten" | "burned" }>
    ) => {
      const { day, oldCalories, newCalories, type } = action.payload;
      const calorieList = state[day][type];
      const index = calorieList.indexOf(oldCalories);
      if (index !== -1) {
        calorieList[index] = newCalories;
      }
    }
  },
});

export const { addCalories, removeCalories, clearCalories, setNutritionData, updateCalories } = nutritionSlice.actions;
export default nutritionSlice.reducer;
