import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import client from "../apollo/client";
import { LOGIN } from "../apollo/mutations";
import Cookie from "js-cookie";
import { USER_DETAILS } from "../apollo/queries";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
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

const openNotification = (type, title, text) => {
  notification[type]({
    message: title,
    description: text,
  });
};

const logOutHandler = (state, message = true) => {
  ["jwt", "refreshToken"].map((key) => Cookie.remove(key));

  state.JWTToken = null;
  state.refreshToken = null;
  state.expire = null;
  state.loading = false;
  state.authorized = false;

  message &&
    openNotification("success", "Logged out", "You have been logged out");
};

const logInHandler = (
  state,
  { refresh_token, expires, access_token },
  message = true
) => {
  state.JWTToken = access_token;
  state.refreshToken = refresh_token;
  state.expire = new Date().getTime() + expires;
  state.authorized = true;
  state.loading = false;

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
    expire: null,
    remember: null,
    authorized: Cookie.get("jwt") ? true : false,
    loading: false,
    userDetails: null,
    userDetailsLoading: false,
  },

  reducers: {
    refreshJWT: (state, action) => {
      const { refresh_token, expires, access_token } = action.payload;
      logInHandler(state, { refresh_token, expires, access_token }, false);
    },
    logOut: (state) => logOutHandler(state),
  },

  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      const { access_token, refresh_token, expires } =
        action.payload.auth_login;
      logInHandler(state, { refresh_token, expires, access_token });
    },
    [logIn.rejected]: (state, action) => {
      logOutHandler(state, false);
      openNotification("error", "Error", action?.error?.message);
    },
    [logIn.pending]: (state) => {
      state.loading = true;
    },

    [fetchUserDetails.fulfilled]: (state, action) => {
      const data = action.payload.users_me;

      state.userDetails = {
        id: data.id,
        username: data.username,
        avatar: data.avatar?.id,
        favouriteRecipes: data.favourtie_recipes.map(
          (recipe) => recipe.recipe_id.id
        ),
      };

      state.userDetailsLoading = false;
    },
    [fetchUserDetails.rejected]: (state) => {
      logOutHandler(state, false);
      openNotification("error", "Error", action?.error?.message);
      state.userDetailsLoading = false;
    },
    [fetchUserDetails.pending]: (state) => {
      state.userDetailsLoading = true;
    },
  },
});

export const { refreshJWT, logOut } = authSlice.actions;

export const isLoading = (state) => state.auth.loading;
export const getRememberState = (state) => state.auth.remember;
export const getJWTState = (state) => state.auth.JWTToken;
export const getExpireState = (state) => state.auth.expire;
export const getIsAuthorized = (state) => state.auth.authorized;
export const getUserDetails = (state) => state.auth.userDetails;

export default authSlice.reducer;
