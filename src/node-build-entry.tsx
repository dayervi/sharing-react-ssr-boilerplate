import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import {StaticRouter} from "react-router-dom/server";
import {Locale} from "./shared/locale";
import LocaleProvider from "./app/contexts/locale";
import App from "./app/app";

type WrapperProps = {
  locale: Locale;
  apolloClient: ApolloClient<InMemoryCache>;
  helmetContext: {};
  staticUrl: string;
}

const Wrapper = (
  {
    locale,
    apolloClient,
    helmetContext,
    staticUrl,
  }: WrapperProps) => {

  return (
    <LocaleProvider locale={locale}>
      <ApolloProvider client={apolloClient}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={staticUrl}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </ApolloProvider>
    </LocaleProvider>);

}

export default Wrapper;
