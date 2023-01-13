const path = require("path");
const dotenv = require("dotenv");
const DotenvWebpack = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

const NODE_MODULES_PATH = path.resolve(__dirname, "node_modules");

const runnableServer = (watchable) => {
  if (!watchable) return [];
  dotenv.config();
  return [ new NodemonPlugin({ env: process.env }) ]
}

const baseConfig = (isNode) => ({
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx", ".css", ".scss" ],
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
          ...!isNode ? [ MiniCssExtractPlugin.loader ] : [],
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        type: "asset/resource",
        generator: {
          emit: !isNode,
          publicPath: "/assets/"
        }
      }
    ]
  }
});

const web = {
  name: "browsered-app",
  mode: "development",
  target: "web",
  entry: "./src/web-build-entry.tsx",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist", "assets"),
    publicPath: "/assets/"
  },
  ...baseConfig(false),
  plugins: [
    new DotenvWebpack(),
    new MiniCssExtractPlugin(),
    new LoadablePlugin({
      filename: "../web-loadable-stats.json"
    })
  ]
};

const node = {
  name: "noded-app",
  mode: "production",
  target: "node",
  entry: "./src/node-build-entry.tsx",
  output: {
    path: path.resolve(__dirname, "dist", "_noded"),
    filename: "[name]-bundle-[chunkhash:8].js",
    libraryTarget: 'commonjs2'
  },
  ...baseConfig(true),
  externals: [ nodeExternals({ modulesDir: NODE_MODULES_PATH }) ],
  plugins: [
    new LoadablePlugin({
      filename: "../node-loadable-stats.json"
    })
  ]
};

const server = (env) =>  ({
  name: "server",
  mode: "development",
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  resolve: {
    extensions: [ ".ts" ],
    modules: [
      path.resolve(__dirname, "src/server"),
      path.resolve(__dirname, "src/shared"),
      NODE_MODULES_PATH
    ]
  },
  externals: [ nodeExternals({ modulesDir: NODE_MODULES_PATH }) ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [ { from: "./src/public", to: "./public" } ] }),
    ...runnableServer(env.WEBPACK_WATCH)
  ]
});

module.exports = [ web, node, server ];
