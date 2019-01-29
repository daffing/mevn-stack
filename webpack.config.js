//npm install -D babel-loader @babel/core babel-preset-env

const { VueLoaderPlugin } = require('vue-loader')

const path = require('path');

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: path.join(__dirname, '/src/public/js'),
    filename: 'bundle.js'
  },
  //archivos a traducir
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}