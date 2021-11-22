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
      '@assets': new URL('./src/assets', import.meta.url).pathname,
      '@apis': new URL('./src/apis', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname
    }
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000/'
    },
  }
}

export default settings;
