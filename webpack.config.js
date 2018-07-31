const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve('./dist/example'),
    filename: './index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-lazily-render': path.resolve('./src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-lazily-render',
      filename: './index.html',
      template: './src/index.html',
    })
  ]
};
