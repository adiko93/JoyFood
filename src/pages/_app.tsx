import "../styles/normalize.css";
import "../styles/globals.css";
import { store } from "../state/store";
import client from "../apollo/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import "../styles/variables.less";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
