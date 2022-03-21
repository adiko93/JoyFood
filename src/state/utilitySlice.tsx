import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationInstance } from "antd/lib/notification";
import { notification } from "antd";
import axiosStrapi from "../query/axiosInstance";
import { RootState } from "./store";

const openNotification = (
  type: keyof NotificationInstance,
  title: string,
  text: string
) => {
  notification[type]({
    message: title,
    description: text,
  });
};

export const fetchCategories = createAsyncThunk(
  "utility/fetchCategories",
  async () => {
    const response = await axiosStrapi.get("/categories");
    return response.data.data;
  }
);

export const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    cookingTime: 0,
    categories: [],
    categoriesLoading: true,
  },
  reducers: {
    updateMaxCookingTime: (state, action) => {
      state.cookingTime = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.map(
        (category: {
          id: number;
          attributes: { category_id: string; title: string };
        }) => ({
          [category.attributes.category_id]: {
            id: category.id,
            title: category.attributes.title,
          },
        })
      );
      state.categoriesLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      openNotification(
        "error",
        "Connection error",
        `There was a problem connecting to the database: ${action?.error?.message}`
      );
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.categoriesLoading = true;
    });
  },
});

export const { updateMaxCookingTime, setCategories } = utilitySlice.actions;

export const getMaxCookingTime = (state: RootState) =>
  state.utility.cookingTime;
export const getCategoriesLoading = (state: RootState) =>
  state.utility.categoriesLoading;
export const getCategories = (state: RootState) => state.utility.categories;

export default utilitySlice.reducer;
