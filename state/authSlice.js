import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import client from "../apollo/client";
import { LOGIN } from "../apollo/mutations";
import Cookie from "js-cookie";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password, remember }, thunkAPI) => {
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

const openNotification = (type, title, text) => {
  notification[type]({
    message: title,
    description: text,
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    JWTToken: Cookie.get("jwt") || null,
    refreshToken: Cookie.get("refreshToken") || null,
    expire: Cookie.get("expires") || null,
    remember: Cookie.get("remember") || null,
    loading: false,
    authorized: Cookie.get("refreshToken") ? true : false,
  },
  reducers: {
    setJWT: (state, action) => {
      state.JWTToken = action.payload;
    },
    refreshJWT: (state, action) => {
      (state.JWTToken = action.payload.access_token),
        {
          expires: (1 / 24 / 60) * 15,
        };
      state.refreshToken = action.payload.refresh_token;
      state.expire = new Date().getTime() + action.payload.expires;
      Cookie.set("jwt", action.payload.access_token);
      Cookie.set("refreshToken", action.payload.refresh_token, {
        expires: state.remember
          ? 7
          : action.payload.expires / 100 / 60 / 60 / 24,
      });
      Cookie.set("expires", new Date().getTime() + action.payload.expires, {
        expires: 365,
      });
      state.authorized = true;
      state.loading = false;
    },
    logOut: (state, action) => {
      ["jwt", "refreshToken", "expires", "remember"].map((key) =>
        Cookie.remove(key)
      );
      state.JWTToken = null;
      state.refreshToken = null;
      state.expire = null;
      state.loading = false;
      state.authorized = false;
      openNotification("success", "Logged out", "You have been logged out");
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    resetJWT: (state, action) => {
      state.JWTToken = null;
    },
  },
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      // Add user to the state array
      state.JWTToken = action.payload.auth_login.access_token;
      state.refreshToken = action.payload.auth_login.refresh_token;
      state.expire = new Date().getTime() + action.payload.auth_login.expires;
      // state.refreshToken = action.payload.auth_login.refresh_token;
      Cookie.set("jwt", action.payload.auth_login.access_token, {
        expires: (1 / 24 / 60) * 15,
      });
      Cookie.set("refreshToken", action.payload.auth_login.refresh_token, {
        expires: state.remember
          ? 7
          : action.payload.auth_login.expires / 100 / 60 / 60 / 24,
      });
      Cookie.set("remember", state.remember, { expires: 365 });
      Cookie.set(
        "expires",
        new Date().getTime() + action.payload.auth_login.expires,
        { expires: 365 }
      );
      state.authorized = true;
      openNotification("success", "Logged in", "Successfully logged in");
      state.loading = false;
    },
    [logIn.rejected]: (state, action) => {
      openNotification("error", "Error", action?.error?.message);
      state.loading = false;
      state.authorized = false;
    },
    [logIn.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJWT, setRemember, refreshJWT, logOut } = authSlice.actions;

export const getAuthState = (state) => state.auth;
export const isLoading = (state) => state.auth.loading;
export const getRememberState = (state) => state.auth.remember;
export const getJWTState = (state) => state.auth.JWTToken;
export const getExpireState = (state) => state.auth.expire;
export const getIsAuthorized = (state) => state.auth.authorized;

export default authSlice.reducer;
