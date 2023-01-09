import React, {useState} from "react";
import {loadableReady} from "@loadable/component";
import buildApolloClient, {APOLLO_CACHE_SCRIPT_ID} from "./shared/gql";
import {ApolloProvider} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {hydrateRoot} from "react-dom/client";
import "./scss/global.scss";
import App from "./app/app";

const Wrapper = () => {

  const [ apolloClient ] = useState(buildApolloClient(false, window.__APOLLO_STATE__));

  // clean state transmission from server rendering to client
  delete window.__APOLLO_STATE__;
  const stateScriptTag = document.getElementById(APOLLO_CACHE_SCRIPT_ID);
  !!stateScriptTag && stateScriptTag.parentNode?.removeChild(stateScriptTag);

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>);

}

loadableReady(() =>
  hydrateRoot(document.getElementById("app")!, <Wrapper />));
