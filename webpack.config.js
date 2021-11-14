import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})
 
const settings = {
  entry: "./src/index.js",
	mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
}

export default settings;
