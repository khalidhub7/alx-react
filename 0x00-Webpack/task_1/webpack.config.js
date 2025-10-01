// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // starting file
  entry: "./js/dashboard_main.js",
  // output file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        // for JS files
        test: /\.js$/,
        exclude: /node_modules/,
        // transpile with Babel
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    static: "./public", // serve from dist
    hot: false, // hot reload
  },

  plugins: [new HtmlWebpackPlugin()],
};
