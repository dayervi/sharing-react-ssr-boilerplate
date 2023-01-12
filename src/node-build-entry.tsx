import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {StaticRouter} from "react-router-dom/server";
import App from "./app/app";

type WrapperProps = {
  staticUrl: string;
  apolloClient: ApolloClient<InMemoryCache>
}

const Wrapper = ({ staticUrl, apolloClient }: WrapperProps) => {

  return (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={staticUrl}>
        <App />
      </StaticRouter>
    </ApolloProvider>);

}

export default Wrapper;
