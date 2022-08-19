const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPLugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: ['./src/frontend/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app.[contenthash].js',
    assetModuleFilename: 'assets/images/[name][ext]',
    publicPath: '/'
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
    new MiniCssExtractPLugin({
      filename: 'assets/app.[contenthash].css'
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      filename: '[path][base].gz'
    }),
    new Dotenv(),
    new WebpackManifestPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/frontend/assets/static/demo.min.mp4'),
          to: 'assets/images/demo.min.mp4'
        }
      ]
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          name: 'commons',
          filename: 'assets/chunks/common.[contenthash].js',
          reuseExistingChunk: true,
          enforce: true,
          priority: 20
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
          filename: 'assets/chunks/vendor.[contenthash].js',
          reuseExistingChunk: true,
          enforce: true,
          priority: 10
        }
      }
    }
  }
}
