const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPLugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    historyApiFallback: true,
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(s*)css$/,
        use: [
          { loader: MiniCssExtractPLugin.loader },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|svg|mp4)/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPLugin({
      filename: 'assets/css/[name].[fullhash].css'
    })
  ]
}