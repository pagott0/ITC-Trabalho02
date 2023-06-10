const path = require('path'); // CommonJS

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
    bundle1: './src/admin/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: '[name].js', // [name] will be replaced by the corresponding entry name
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
    ]
  },
  devtool: 'source-map'
};