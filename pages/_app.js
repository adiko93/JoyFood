import "../styles/normalize.css";
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { store } from "../state/store";
// import client from "../apollo/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";
import { TokenRefreshLink } from "apollo-link-token-refresh";
// import { store } from "../state/store";
import jwtDecode from "jwt-decode";
import { SITE_BACKEND_URL } from "../utility/globals";
import { useEffect, useState } from "react";
import { getJWTState, setJWT } from "../state/authSlice";
import { Spin } from "antd";
import axios from "axios";

const customFetch = async (uri, options) => {
  return fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      authorization: store.getState().auth.JWTToken
        ? `Bearer ${store.getState().auth.JWTToken}`
        : ``,
    },
  });
};

const httpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql`,
  credentials: "include",
  fetch: customFetch,
});
const systemHttpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql/system`,
  credentials: "include",

  // headers: {
  //   Authorization: "bearer test",
  // },
  fetch: customFetch,
});

// const JWTToken = Cookies.get("JWTToken");

const cache = new InMemoryCache();

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    new TokenRefreshLink({
      isTokenValidOrUndefined: () => {
        const cookie = store.getState().auth.JWTToken;
        if (!cookie) return true;
        try {
          const { exp } = jwtDecode(cookie);
          if (Date.now() >= exp * 1000) return false;
          return true;
        } catch (error) {
          return false;
        }
      },
      fetchAccessToken: async () => {
        return await axios.post(`${SITE_BACKEND_URL}/auth/refresh`, null, {
          withCredentials: true,
        }).data.data.access_token;
      },
      handleFetch: (accessToken) => {
        store.dispatch(setJWT(accessToken.data.data.access_token));
      },
      handleResponse: (operation, accessTokenField) => (response) => {
        // here you can parse response, handle errors, prepare returned token to
        // further operations
        // returned object should be like this:
        // {
        //    access_token: 'token string here'
        // }
      },
      handleError: async (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
        store.dispatch(setJWT(null));
        return await axios.post(`${SITE_BACKEND_URL}/auth/logout`, null, {
          withCredentials: true,
        });
        // your custom action here
        // user.logout();
      },
    }),
    ApolloLink.split(
      (operation) => operation.getContext().clientName === "system",
      systemHttpLink,
      httpLink
    ),
  ]),
  credentials: "include",
  cache: cache,

  headers: {
    Authorization: "bearer test",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
