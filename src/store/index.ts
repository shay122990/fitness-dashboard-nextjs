import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workoutsReducer from "./workoutsSlice";
import nutritionReducer from "./nutritionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutsReducer,
    nutrition: nutritionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
