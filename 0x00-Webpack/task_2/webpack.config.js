const path = require("path");

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
  // 1 MB
  // performance: { maxAssetSize: 1000000 },
};
