const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "js/dashboard_main.js"),

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
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
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },

  performance: {
    maxAssetSize: 1000000, // 1 MB
  },
};
