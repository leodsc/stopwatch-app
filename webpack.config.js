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
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  resolve: {
    alias: {
      '@src/assets': new URL('./src/assets', import.meta.url).pathname,
      '@src/apis': new URL('./src/apis', import.meta.url).pathname,
      '@src/components': new URL('./src/components', import.meta.url).pathname
    }
  },
  devServer: {
    historyApiFallback: true
  }
}

export default settings;
