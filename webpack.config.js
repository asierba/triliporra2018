const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
                ]
            }
      ]
  },
  plugins: [
    new CopyWebpackPlugin([
        {
          from: 'src/index.html',
          to: 'index.html'
        }])
  ]
};