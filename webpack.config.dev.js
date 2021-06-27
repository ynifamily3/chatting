const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "virtualDist"),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
  mode: "development",
  entry: {
    client: "./src/client/index.tsx",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "virtualDist"),
    filename: "[name].[chunkhash].bundle.js",
  },
  target: "web",
  node: {
    __dirname: false, // https://webpack.js.org/configuration/node/#node__dirname
  },
  optimization: {
    splitChunks: false,
    minimize: false,
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
    }),
  ],
};
