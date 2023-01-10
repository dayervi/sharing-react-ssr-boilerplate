const path = require("path");
const dotenv = require("dotenv");
const dotenvWebpack = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

const NODE_MODULES_PATH = path.resolve(__dirname, "node_modules");

const baseConfig = (isServer) => ({
  resolve: {
    extensions: [ ".ts", ".tsx" ],
    modules: [
      path.resolve(__dirname, "src"),
      NODE_MODULES_PATH
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          ...!isServer ? [ MiniCssExtractPlugin.loader ] : [],
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        type: "asset/resource",
        generator: {
          emit: !isServer,
          publicPath: "/assets/"
        }
      }
    ]
  }
});

const runnableServer = (watchable) => {
  if (!watchable) return [];
  dotenv.config();
  return [ new NodemonPlugin({ env: process.env }) ]
}

const client = {
  name: "client",
  mode: "development",
  target: "web",
  entry: "./src/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist", "assets")
  },
  ...baseConfig(false),
  plugins: [
    new dotenvWebpack(),
    new MiniCssExtractPlugin(),
    new LoadablePlugin({ filename: "../loadable-stats.json" })
  ]
};

const server = (env) => ({
  name: "server",
  mode: "development",
  target: "node",
  entry: "./src/server.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  ...baseConfig(true),
  externals: [ nodeExternals({ modulesDir: NODE_MODULES_PATH }) ],
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ...runnableServer(env.WEBPACK_WATCH)
  ]
});

module.exports = [ client, server ];
