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
        type: "asset/resource",
        generator: { filename: "images/[name][ext]" },
      },
    ],
  },

  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: ["imagemin-mozjpeg", "imagemin-pngquant"],
          },
        },
      }),
    ],
  },
  performance: {
    maxAssetSize: 1000000, // 1 MB
  },
};
