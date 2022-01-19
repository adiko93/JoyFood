import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import filtersSlice from "./listSlice";
import utilitySlice from "./utilitySlice";

export const store = configureStore({
  reducer: {
    utility: utilitySlice,
    list: filtersSlice,
    auth: authSlice,
  },
});
