import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  cups: 0,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    updateWaterIntake: (state, action) => {
      state.cups = action.payload;
    },
    resetWaterIntake: (state) => {
      state.cups = 0;
    },
  },
});

export const { updateWaterIntake, resetWaterIntake } = waterSlice.actions;

const persistConfig = {
  key: "water",
  storage,
};

export default persistReducer(persistConfig, waterSlice.reducer);
