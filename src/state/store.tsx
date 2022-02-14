import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./authSlice";
import filtersSlice from "./listSlice";
import utilitySlice from "./utilitySlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  utility: utilitySlice,
  list: filtersSlice,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
