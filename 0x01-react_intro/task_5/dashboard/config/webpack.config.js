const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { static: "./dist", open: true, hot: true },

  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      // handle css
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // handle js
      /* {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      }, */
      // handle images
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },

  // plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()]
  plugins: [new HtmlWebpackPlugin()],
  // optimization: { splitChunks: { chunks: "all" } },
};
