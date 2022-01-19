import "../styles/normalize.css";
import "../styles/globals.css";
import { store } from "../state/store";
import client from "../apollo/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

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
