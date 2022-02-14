import { createSlice } from "@reduxjs/toolkit";

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

// Action creators are generated for each case reducer function
export const { updateMaxCookingTime } = utilitySlice.actions;

export const getMaxCookingTime = (state) => state.utility.cookingTime;

export default utilitySlice.reducer;
