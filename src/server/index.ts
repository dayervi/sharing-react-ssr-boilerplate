import path from "path";
import express from "express";
import {createElement} from "react";
import {ChunkExtractor} from "@loadable/server";
import {getDataFromTree, renderToStringWithData} from "@apollo/client/react/ssr";
import {FilledContext} from "react-helmet-async";
import {determineLocale} from "../shared/locale";
import buildApolloClient, {APOLLO_CACHE_SCRIPT_ID} from "../shared/gql";

const SERVER_PORT = +process.env.PORT! || 4200;
const ASSET_PATH = "/assets/";
const app = express();

const webLoadablePath = path.join(__dirname, "web-loadable-stats.json");
const nodeLoadablePath = path.join(__dirname, "node-loadable-stats.json");

app.disable("x-powered-by");
app.use(ASSET_PATH, express.static(path.resolve(__dirname, "assets")));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("*", async(req, res) => {

  const locale = determineLocale(req.acceptsLanguages(), req.path);
  if (req.path === "/")
    return res.redirect(`/${locale.basename}/`);

  const helmetContext = {};
  const apolloClient = buildApolloClient(true);
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeLoadablePath });
  const webExtractor = new ChunkExtractor({ statsFile: webLoadablePath, publicPath: ASSET_PATH });

  const { default: App } = nodeExtractor.requireEntrypoint();
  const jsx = createElement(App as any, { locale, helmetContext, staticUrl: req.url, apolloClient });

  await getDataFromTree(jsx);
  const apolloState = apolloClient.extract();
  const rendering = await renderToStringWithData(jsx);
  const { helmet } = helmetContext as FilledContext;

  res.set("content-type", "text/html");
  res.send(`
    <!doctype ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&amp;display=swap">
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
    </head>
    <body>
      <div id="app">${rendering}</div>
      <script>window.__ASSETS_PATH__ = ${ASSET_PATH};</script>
      <script id="${APOLLO_CACHE_SCRIPT_ID}">window.__APOLLO_STATE__= ${JSON.stringify(JSON.stringify(apolloState))};</script>
      ${webExtractor.getScriptTags()}
    </body>
  `);

});

app.listen(SERVER_PORT, () =>
  console.log(`⚡ local server is running on port ${SERVER_PORT}`));
