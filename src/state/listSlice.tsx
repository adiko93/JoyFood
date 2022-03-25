import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import _ from "lodash";

interface ListInitialState {
  filters: {
    search: string;
    categories: string[];
    cookingTime: [number, number];
    ingredients: string[];
    rating: [number, number];
    author: string;
  };
  pagination: {
    page: number;
    perPage: number;
  };
  rerenderFilters: boolean;
}

const initialState = {
  filters: {
    search: "",
    categories: [],
    cookingTime: [1, 2000],
    ingredients: [],
    rating: [0, 5],
    author: "",
  },
  pagination: {
    page: 1,
    perPage: 12,
  },
  rerenderFilters: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filters.categories = [];
    },
    updateFilters: (
      state: any,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state.filters[action.payload.name] = action.payload.value;
    },
    updateInArrayFilters: (state: any, action) => {
      state.filters[action.payload.name][action.payload.number] =
        action.payload.value;
    },
    updatePagination: (state: any, action) => {
      state.pagination[action.payload.name] = action.payload.value;
    },
    rerenderFilters: (state) => {
      state.rerenderFilters = true;
      state.filters.categories = [];
      state.filters.cookingTime = [1, 2000];
      state.filters.ingredients = [];
      state.filters.rating = [0, 5];
      state.filters.author = "";
      state.filters.search = "";
      state.pagination.page = 1;
      state.pagination.perPage = 12;
    },
    rerenderFiltersFalse: (state) => {
      state.rerenderFilters = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateFilters,
  updatePagination,
  updateInArrayFilters,
  resetFilters,
  rerenderFilters,
  rerenderFiltersFalse,
} = listSlice.actions;

export const getFilters = (state: RootState) => state.list.filters;
export const getSearch = (state: RootState) => state.list.filters.search;
export const getCategoriesFilters = (state: RootState) =>
  state.list.filters.categories;
export const getCookingTime = (state: RootState) =>
  state.list.filters.cookingTime;
export const getIngredients = (state: RootState) =>
  state.list.filters.ingredients;
export const getRating = (state: RootState) => state.list.filters.rating;
export const getAuthor = (state: RootState) => state.list.filters.author;
export const getRerenderFilters = (state: RootState) =>
  state.list.rerenderFilters;
export const getPagination = (state: RootState) => state.list.pagination;
export const getPage = (state: RootState) => state.list.pagination.page;
export const getPerPage = (state: RootState) => state.list.pagination.perPage;

export default listSlice.reducer;
