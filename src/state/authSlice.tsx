import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import client from "../apollo/client";
import { LOGIN } from "../apollo/mutations";
import Cookie from "js-cookie";
import { USER_DETAILS } from "../apollo/queries";
import { NotificationInstance } from "antd/lib/notification";
import { RootState } from "./store";

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
    const response = await client.mutate({
      mutation: LOGIN,
      context: {
        clientName: "system",
      },
      variables: {
        email: email,
        password: password,
      },
      fetchPolicy: "no-cache",
    });

    response.data.auth_login.remember = remember;
    return response.data;
  }
);

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async () => {
    const response = await client.query({
      query: USER_DETAILS,
      context: {
        clientName: "system",
      },
      fetchPolicy: "no-cache",
    });
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
  ["jwt", "refreshToken"].map((key) => Cookie.remove(key));

  state.JWTToken = null;
  state.refreshToken = null;
  state.expire = 0;
  state.loading = false;
  state.authorized = false;

  message &&
    openNotification("success", "Logged out", "You have been logged out");
};

const logInHandler = (
  state: RootState["auth"],
  {
    refresh_token,
    expires,
    access_token,
    remember,
  }: {
    refresh_token: string;
    expires: number;
    access_token: string;
    remember?: boolean;
  },
  message = true
) => {
  state.JWTToken = access_token;
  state.refreshToken = refresh_token;
  state.expire = new Date().getTime() + expires;
  state.authorized = true;
  state.loading = false;

  if (remember || Cookie.get("remember") === "true") {
    Cookie.set("remember", "true");
    state.remember = true;
  }

  Cookie.set("jwt", access_token, {
    expires: (1 / 24 / 60) * 15,
  });

  Cookie.set("refreshToken", refresh_token, {
    expires: state.remember ? 7 : expires / 100 / 60 / 60 / 24,
  });

  message && openNotification("success", "Logged in", "Successfully logged in");
};

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    JWTToken: Cookie.get("jwt") || null,
    refreshToken: Cookie.get("refreshToken") || null,
    expire: 0,
    remember: false,
    authorized: Cookie.get("jwt") ? true : false,
    loading: false,
    userDetails: {
      id: null,
      username: null,
      avatar: null,
      favouriteRecipes: null,
    },
    userDetailsLoading: false,
  },

  reducers: {
    refreshJWT: (state, action) => {
      const { refresh_token, expires, access_token } = action.payload;
      logInHandler(state, { refresh_token, expires, access_token }, false);
    },
    logOut: (state) => logOutHandler(state),
    setFavouriteRecipes: (state, action) => {
      if (state?.userDetails?.favouriteRecipes)
        state.userDetails.favouriteRecipes = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      const { access_token, refresh_token, expires, remember } =
        payload.auth_login;
      logInHandler(state, { refresh_token, expires, access_token, remember });
    });
    builder.addCase(logIn.rejected, (state, action) => {
      logOutHandler(state, false);
      openNotification("error", "Error", action?.error?.message!);
    });
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      const data = action.payload.users_me;

      state.userDetails = {
        id: data.id,
        username: data.username,
        avatar: data.avatar?.id,
        favouriteRecipes: data.favourtie_recipes.map(
          (recipe: any) => recipe.recipe_id.id
        ),
      };

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

export const { refreshJWT, logOut, setFavouriteRecipes } = authSlice.actions;

export const isLoading = (state: RootState) => state.auth.loading;
export const getRememberState = (state: RootState) => state.auth.remember;
export const getJWTState = (state: RootState) => state.auth.JWTToken;
export const getExpireState = (state: RootState) => state.auth.expire;
export const getIsAuthorized = (state: RootState) => state.auth.authorized;
export const getUserDetails = (state: RootState) => state.auth.userDetails;

export default authSlice.reducer;
