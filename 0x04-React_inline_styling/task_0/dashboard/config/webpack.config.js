const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "../dist"),
    open: true,
    hot: true,
  },

  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      // handle css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // handle js
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // handle images
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../dist/index.html"),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!index.html"],
    }),
  ],
  optimization: { splitChunks: { chunks: "all" } },
};
