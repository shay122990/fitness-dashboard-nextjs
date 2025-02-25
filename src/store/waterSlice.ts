import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  userId: null, 
  cups: 0,
};


const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload; 
    },
    updateWaterIntake: (state, action) => {
      state.cups = action.payload;
    },
    resetWaterIntake: (state) => {
      state.cups = 0;
    },
  },
});


export const {setUser, updateWaterIntake, resetWaterIntake } = waterSlice.actions;

const persistConfig = {
  key: "water",
  storage,
};

export default persistReducer(persistConfig, waterSlice.reducer);
