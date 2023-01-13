// @ts-ignore
__webpack_public_path__ = window.__ASSETS_PATH__;

import React, {useState} from "react";
import {loadableReady} from "@loadable/component";
import {ApolloProvider} from "@apollo/client";
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from 'react-router-dom';
import {hydrateRoot} from "react-dom/client";
import {determineLocale} from "./shared/locale";
import buildApolloClient, {APOLLO_CACHE_SCRIPT_ID} from "./shared/gql";
import LocaleProvider from "./app/contexts/locale";
import {ScrollToTop} from "./app/routes";
import App from "./app/app";

const Wrapper = () => {

  const [ apolloClient ] = useState(buildApolloClient(false, window.__APOLLO_STATE__));
  const determinedLocale = determineLocale(navigator.languages || [], window.location.pathname);

  // clean state transmission from server rendering to client
  delete window.__APOLLO_STATE__;
  const stateScriptTag = document.getElementById(APOLLO_CACHE_SCRIPT_ID);
  !!stateScriptTag && stateScriptTag.parentNode?.removeChild(stateScriptTag);

  return (
    <LocaleProvider locale={determinedLocale}>
      <ApolloProvider client={apolloClient}>
        <HelmetProvider>
          <BrowserRouter>
            <ScrollToTop>
              <App/>
            </ScrollToTop>
          </BrowserRouter>
        </HelmetProvider>
      </ApolloProvider>
    </LocaleProvider>);

}

loadableReady(() =>
  hydrateRoot(document.getElementById("app")!, <Wrapper/>));
