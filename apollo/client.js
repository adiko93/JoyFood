// import {
//   ApolloClient,
//   ApolloLink,
//   createHttpLink,
//   InMemoryCache,
//   useQuery,
// } from "@apollo/client";
// import Cookies from "js-cookie";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
// // import { store } from "../state/store";
// import jwtDecode from "jwt-decode";
// import { SITE_BACKEND_URL } from "../utility/globals";
// import { USER_DETAILS } from "./queries";
// import { store } from "../state/store";
// import { setJWT } from "../state/authSlice";

// const customFetch = async (uri, options) => {
//   const JWTCookie = Cookies.get("jwt");
//   return fetch(uri, {
//     ...options,
//     headers: {
//       ...options.headers,
//       authorization: JWTCookie ? `Bearer ${JWTCookie}` : ``,
//     },
//   });
// };

// const httpLink = createHttpLink({
//   uri: `${SITE_BACKEND_URL}/graphql`,
//   credentials: "include",
// });
// const systemHttpLink = createHttpLink({
//   uri: `${SITE_BACKEND_URL}/graphql/system`,
//   credentials: "include",
// });

// // const JWTToken = Cookies.get("JWTToken");

// export const cache = new InMemoryCache();

// const client = new ApolloClient({
//   connectToDevTools: true,
//   link: ApolloLink.from([
//     new TokenRefreshLink({
//       isTokenValidOrUndefined: () => {
//         const cookie = store.getState().auth.JWTToken;
//         if (!cookie) return false;
//         try {
//           const { exp } = jwtDecode(cookie);
//           if (Date.now() >= exp * 1000) return false;
//           return true;
//         } catch (error) {
//           return false;
//         }
//       },
//       fetchAccessToken: async () => {
//         const refreshToken = Cookies.get("refreshToken");
//         return await axios.post(`${SITE_BACKEND_URL}/auth/refresh`, null, {
//           withCredentials: true,
//         });
//       },
//       handleFetch: async (accessToken) => {
//         await store.dispatch(setJWT(accessToken.data.data.access_token));
//       },
//       handleResponse: (operation, accessTokenField) => (response) => {
//         // here you can parse response, handle errors, prepare returned token to
//         // further operations
//         // returned object should be like this:
//         // {
//         //    access_token: 'token string here'
//         // }
//       },
//       handleError: (err) => {
//         // full control over handling token fetch Error
//         console.warn("Your refresh token is invalid. Try to relogin");
//         console.error(err);

//         // your custom action here
//         // user.logout();
//       },
//     }),
//     ApolloLink.split(
//       (operation) => operation.getContext().clientName === "system",
//       systemHttpLink,
//       httpLink
//     ),
//   ]),
//   credentials: "include",
//   cache: cache,

//   // headers: {
//   //   authorization: store.getState().auth?.JWTToken
//   //     ? `Bearer ${store.getState().auth.JWTToken}`
//   //     : ``,
//   // },
// });

// export default client;
