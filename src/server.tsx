import path from "path";
import express from "express";
import React from "react";
import {getDataFromTree, renderToStringWithData} from "@apollo/client/react/ssr";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom/server";
import {ChunkExtractor} from "@loadable/server";
import {ApolloProvider} from "@apollo/client";
import buildApolloClient, {APOLLO_CACHE_SCRIPT_ID} from "./shared/gql";
import App from "./app/app";

const SERVER_PORT = +process.env.PORT! || 4200;
const app = express();
const loadablePath = path.join(__dirname, "loadable-stats.json");

app.disable("x-powered-by");
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("*", async (req, res) => {

  const apolloClient = buildApolloClient(true);
  const chunkExtractor = new ChunkExtractor({
    statsFile: loadablePath,
    publicPath: "assets"
  });

  const wrapper = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ApolloProvider>);

  await getDataFromTree(wrapper);
  const apolloState = apolloClient.extract();
  const rendering = await renderToStringWithData(wrapper);

  res.set("content-type", "text/html");
  res.send(`
    <!doctype html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&amp;display=swap">
      ${chunkExtractor.getLinkTags()}
      ${chunkExtractor.getStyleTags()}
    </head>
    <body>
      <div id="app">${rendering}</div>
      <script id="${APOLLO_CACHE_SCRIPT_ID}">window.__APOLLO_STATE__= ${JSON.stringify(JSON.stringify(apolloState))};</script>
      ${chunkExtractor.getScriptTags()}
    </body>
  `);

});

app.listen(SERVER_PORT, () =>
  console.log(`⚡ local server is running on port ${SERVER_PORT}`));
