import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { client } from "../pages/_app";
import { LOGIN, REFRESH_TOKEN } from "../apollo/mutations";
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
export const refreshMutation = createAsyncThunk(
  "auth/refreshMutation",
  async ({ token, remember }, thunkAPI) => {
    const response = await client.mutate({
      mutation: REFRESH_TOKEN,
      context: {
        clientName: "system",
      },
      variables: {
        token: token,
      },
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
    JWTToken: null,
    refreshToken: null,
    expire: null,
    remember: true,
    loading: false,
    authorized: false,
  },
  reducers: {
    setJWT: (state, action) => {
      state.JWTToken = action.payload;
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
      // state.expire = new Date().getTime() + action.payload.auth_login.expires;
      // state.refreshToken = action.payload.auth_login.refresh_token;
      // Cookie.set("jwt", action.payload.auth_login.access_token, {
      //   expires: action.payload.auth_login.expires / 100 / 60 / 60 / 24,
      // });
      // Cookie.set("refreshToken", action.payload.auth_login.refresh_token, {
      //   expires: state.remember
      //     ? 7
      //     : action.payload.auth_login.expires / 100 / 60 / 60 / 24,
      // });
      // Cookie.set("remember", state.remember, { expires: 365 });
      // Cookie.set(
      //   "expires",
      //   new Date().getTime() + action.payload.auth_login.expires,
      //   { expires: 365 }
      // );
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
    [refreshMutation.rejected]: () => {
      openNotification(
        "error",
        "Error",
        "Something went wrong while trying to refresh your login token. Please login again"
      );
      state.authorized = false;
      Cookie.remove("refreshToken");
    },
    [refreshMutation.fulfilled]: (state, action) => {
      state.JWTToken = action.payload.auth_refresh.access_token;
      state.expire = new Date().getTime() + action.payload.auth_refresh.expires;
      state.refreshToken = action.payload.auth_refresh.refresh_token;
      Cookie.set("jwt", action.payload.auth_refresh.access_token, {
        expires: action.payload.auth_refresh.expires / 100 / 60 / 60 / 24,
      });
      Cookie.set("refreshToken", action.payload.auth_refresh.refresh_token, {
        expires: state.remember
          ? 365
          : action.payload.auth_refresh.expires / 100 / 60 / 60 / 24,
      });
      Cookie.set("remember", state.remember, { expires: 365 });
      Cookie.set(
        "expires",
        new Date().getTime() + action.payload.auth_refresh.expires,
        { expires: 365 }
      );
      state.authorized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJWT, setRemember, resetJWT } = authSlice.actions;

export const getAuthState = (state) => state.auth;
export const isLoading = (state) => state.auth.loading;
export const getRememberState = (state) => state.auth.remember;
export const getJWTState = (state) => state.auth.JWTToken;
export const getExpireState = (state) => state.auth.expire;
export const getIsAuthorized = (state) => state.auth.authorized;

export default authSlice.reducer;
