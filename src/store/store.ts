import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import workoutsReducer from "./workoutsSlice";
import nutritionReducer from "./nutritionSlice";
import waterReducer from "./waterSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const waterPersistConfig = {
  key: "water",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    workouts: workoutsReducer,
    nutrition: nutritionReducer,
    water: persistedWaterReducer,
  },
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
