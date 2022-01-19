import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
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
    resetFilters: null,
  },
  reducers: {
    resetFilters: (state) => {
      state.filters.categories = [];
    },
    updateFilters: (state, action) => {
      state.filters[action.payload.name] = action.payload.value;
    },
    updateInArrayFilters: (state, action) => {
      state.filters[action.payload.name][action.payload.number] =
        action.payload.value;
    },
    updatePagination: (state, action) => {
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

export const getFilters = (state) => state.list.filters;
export const getSearch = (state) => state.list.filters.search;
export const getCategories = (state) => state.list.filters.categories;
export const getCookingTime = (state) => state.list.filters.cookingTime;
export const getIngredients = (state) => state.list.filters.ingredients;
export const getRating = (state) => state.list.filters.rating;
export const getAuthor = (state) => state.list.filters.author;
export const getRerenderFilters = (state) => state.list.rerenderFilters;

export const getPagination = (state) => state.list.pagination;
export const getPage = (state) => state.list.pagination.page;
export const getPerPage = (state) => state.list.pagination.perPage;

export default listSlice.reducer;
