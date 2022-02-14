import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { SITE_BACKEND_URL } from "../utility/globals";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { store } from "../state/store";
import { logOut, refreshJWT } from "../state/authSlice";

const customFetch = async (
  uri: RequestInfo,
  options: RequestInit
): Promise<Response> => {
  return fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: store.getState().auth.JWTToken
        ? `Bearer ${store.getState().auth.JWTToken}`
        : ``,
    },
  });
};

const httpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql`,
  fetch: customFetch,
});

const systemHttpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql/system`,
  fetch: customFetch,
});

export const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    new TokenRefreshLink({
      isTokenValidOrUndefined: () => {
        // Check if JWT token is unindetified
        if (
          !store.getState().auth.JWTToken &&
          !store.getState().auth.refreshToken
        ) {
          return true;
        }
        if (store.getState().auth.expire! - new Date().getTime() >= 0) {
          return true;
        }
        return false;
      },
      fetchAccessToken: async () => {
        if (!store.getState().auth.refreshToken) {
          return null;
        }
        const data = await fetch(`${SITE_BACKEND_URL}/graphql/system`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ` mutation RefreshToken($token: String) {
              auth_refresh(refresh_token: $token) {
                access_token
                expires
                refresh_token
              }
            }`,
            variables: {
              token: store.getState().auth.refreshToken,
            },
          }),
        });
        return data.json();
      },
      handleResponse:
        (operation, accessTokenField) => async (response: any) => {
          if (!response.data?.auth_refresh) {
            store.dispatch(logOut());
            return { newToken: null };
          }
          store.dispatch(refreshJWT(response.data?.auth_refresh));

          return { newToken: response.data?.refreshUserToken?.token };
        },
      handleFetch: (accessToken) => {},
    }),
    ApolloLink.split(
      (operation) => operation.getContext().clientName === "system",
      systemHttpLink,
      httpLink
    ),
  ]),
  credentials: "include",
  cache: cache,
});

export default client;
