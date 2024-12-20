import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authReducer from "./authSlice";
import workoutsReducer from "./workoutsSlice";
import nutritionReducer from "./nutritionSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistNutritionConfig = {
  key: "nutrition",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedNutritionReducer = persistReducer(persistNutritionConfig, nutritionReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    workouts: workoutsReducer,
    nutrition: persistedNutritionReducer,
  },
  // Ignore non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
