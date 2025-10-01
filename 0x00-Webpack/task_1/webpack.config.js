// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/dashboard_main.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  /* module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    static: "./public",
    hot: false,
  },
  plugins: [new HtmlWebpackPlugin()], */
};
