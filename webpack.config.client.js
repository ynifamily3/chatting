const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    client: "./src/client/index.tsx",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build/front"),
    filename: "[name].[chunkhash].bundle.js",
    publicPath: "./",
  },
  target: "web",
  node: {
    __dirname: false, // https://webpack.js.org/configuration/node/#node__dirname
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts)|(tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, ".babelrc.client.js"),
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            emitFile: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      publicPath: "./front",
    }),
  ],
};
