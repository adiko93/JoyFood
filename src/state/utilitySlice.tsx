import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    cookingTime: 0,
  },
  reducers: {
    updateMaxCookingTime: (state, action) => {
      state.cookingTime = action.payload;
    },
  },
});

export const { updateMaxCookingTime } = utilitySlice.actions;

export const getMaxCookingTime = (state: RootState) =>
  state.utility.cookingTime;

export default utilitySlice.reducer;
