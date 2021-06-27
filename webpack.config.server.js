const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    server: "./src/server/server.ts",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "node",
  externals: [nodeExternals()], // express 프레임워크와 엮인 모듈이 많아서 의존성을 끊고 내가 작성한 파일만 번들링
  node: {
    __dirname: false, // https://webpack.js.org/configuration/node/#node__dirname
  },
  module: {
    rules: [
      {
        test: /\.(ts)|(tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, ".babelrc.server.js"),
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
