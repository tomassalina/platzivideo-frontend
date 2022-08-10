const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPLugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: ['./src/frontend/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app-[fullhash].js',
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
      filename: 'assets/app-[fullhash].css'
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      filename: '[path][base].gz'
    }),
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  }
}
