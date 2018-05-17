const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  mode: 'production',
  devServer: {
    contentBase: './dist',
    proxy: {
      "/api": "http://localhost:3000"
    },
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: 'index.html'
      }]),
    new CopyWebpackPlugin([
      {
        from: 'src/images/',
        to: 'images/'
      }]),
    new CleanWebpackPlugin(['dist']),
    // new BundleAnalyzerPlugin()
  ]
};
