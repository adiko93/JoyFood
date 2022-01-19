import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SITE_BACKEND_URL } from "../utility/globals";

const httpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql`,
  credentials: "include",
});
const systemHttpLink = createHttpLink({
  uri: `${SITE_BACKEND_URL}/graphql/system`,
  credentials: "include",
});

export const cache = new InMemoryCache();

const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
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
