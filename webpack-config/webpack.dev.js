const { merge } = require('webpack-merge');
const { dev } = require('./constants');
const common = require('./webpack.common.js');
const devServer = require('./dev-server');

/**
 * Webpack dev config
 *
 * @type {{output: {chunkFilename: string, path: *, filename: string, publicPath: string}, mode: (string|false), entry: string, resolve: {extensions: string[], mainFields: string[], alias: {"~root": string, "~": string}}, plugins: (CopyPlugin|false|ReactRefreshPlugin|*|MiniCssExtractPlugin|CleanWebpackPlugin)[], module: {rules: [{test: RegExp, use: {loader: string, options: {getCustomTransformers: (function(): {before}), transpileOnly: boolean}}[]},{test: *, use: (string|{loader: string, options})[], exclude: *, sideEffects: boolean},{test: *, use: (string|{loader: string, options})[]},{test: *, use: (string|{loader: string, options})[], exclude: *, sideEffects: boolean},{test: *, use: (string|{loader: string, options})[]},null,null]}, context: string, target: string[]}}
 */
module.exports = merge(common(dev), {
  mode: 'development',
  devServer,
  devtool: 'eval-cheap-module-source-map',
});
