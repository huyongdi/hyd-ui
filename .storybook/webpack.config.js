const path = require("path")
const webpack = require('webpack')

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader"
        ],
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".js", ".json"]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en-gb/),
  ]
}
