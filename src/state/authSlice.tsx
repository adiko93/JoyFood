import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import Cookie from "js-cookie";
import { NotificationInstance } from "antd/lib/notification";
import { RootState } from "./store";
import axiosStrapi from "../query/axiosInstance";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const response = await axiosStrapi.post("/auth/local", {
      identifier: email,
      password: password,
    });
    response.data.remember = remember;
    return response.data;
  }
);

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async () => {
    const response = await axiosStrapi.get("/users/me");
    return response.data;
  }
);

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

const logOutHandler: Function = (state: RootState["auth"], message = true) => {
  ["jwt", "remember"].map((key) => Cookie.remove(key));

  state.JWTToken = null;
  state.loading = false;
  state.authorized = false;
  state.userDetails = {
    id: null,
    username: null,
    avatar: null,
    email: null,
    favourite_recipes: null,
  };
  // axiosStrapi.interceptors.request.use(function (config: any) {
  //   config.headers.Authorization = "sfasf";

  //   return config;
  // });
  axiosStrapi.defaults.headers.common["Authorization"] = "";
  message &&
    openNotification("success", "Logged out", "You have been logged out");
};

const logInHandler = (
  state: RootState["auth"],
  {
    jwt,
    remember,
  }: {
    jwt: string;
    remember?: boolean;
  },
  message = true
) => {
  state.JWTToken = jwt;
  state.authorized = true;
  state.loading = false;
  axiosStrapi.defaults.headers.common["Authorization"] = jwt;

  if (remember || Cookie.get("remember") === "true") {
    Cookie.set("remember", "true");
    state.remember = true;
  }

  Cookie.set("jwt", jwt, {
    expires: remember ? 30 : 1,
  });

  message && openNotification("success", "Logged in", "Successfully logged in");
};

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    JWTToken: Cookie.get("jwt") || null,
    remember: false,
    authorized: Cookie.get("jwt") ? true : false,
    loading: false,
    userDetails: {
      id: null,
      username: null,
      avatar: null,
      email: null,
      favourite_recipes: null,
    },
    userDetailsLoading: false,
  },

  reducers: {
    logOut: (state) => logOutHandler(state),
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    setFavouriteRecipes: (state, action) => {
      if (state?.userDetails?.favourite_recipes)
        state.userDetails.favourite_recipes = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      const { jwt, remember } = payload;
      logInHandler(state, { jwt, remember });
    });
    builder.addCase(logIn.rejected, (state, action) => {
      logOutHandler(state, false);
      openNotification("error", "Error", action?.error?.message!);
    });
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
      state.userDetails = payload;

      state.userDetailsLoading = false;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      logOutHandler(state, false);
      openNotification("error", "Error", action?.error?.message!);
      state.userDetailsLoading = false;
    });
    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.userDetailsLoading = true;
    });
  },
});

export const { logOut, setFavouriteRecipes, setRemember } = authSlice.actions;

export const isLoading = (state: RootState) => state.auth.loading;
export const getRememberState = (state: RootState) => state.auth.remember;
export const getJWTState = (state: RootState) => state.auth.JWTToken;
export const getIsAuthorized = (state: RootState) => state.auth.authorized;
export const getUserDetails = (state: RootState) => state.auth.userDetails;

export default authSlice.reducer;
