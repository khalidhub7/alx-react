const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8564,
  },
  entry: {
    header: path.resolve(__dirname, "modules/header/header.js"),
    body: path.resolve(__dirname, "modules/body/body.js"),
    footer: path.resolve(__dirname, "modules/footer/footer.js"),
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      // handle CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // handle images
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          "file-loader",
          // "image-webpack-loader"
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ],
  },
  // 1 MB
  // performance: { maxAssetSize: 1000000 },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()],
  optimization: {
    splitChunks: { chunks: "all" },
  },
};
