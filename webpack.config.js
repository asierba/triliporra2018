const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: './src/web/main.js',
  devtool: 'inline-source-map',
  mode: 'production',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

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
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
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
        from: 'src/web/index.html',
        to: 'index.html'
      }]),
    new CopyWebpackPlugin([
      {
        from: 'src/web/images/',
        to: 'images/'
      }]),
    new CleanWebpackPlugin(['dist']),
    // new BundleAnalyzerPlugin()
  ]
};
