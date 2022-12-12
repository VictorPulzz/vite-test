const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const { DEV_MODE, PROD_MODE, paths, appTitle } = require('./constants');

const {
  createTsLoader,
  createCssLoader,
  createCssModuleLoader,
  createScssLoader,
  createScssModuleLoader,
  createImageLoader,
  createFontLoader,
} = require('./loaders');

/**
 * Webpack common config
 */
module.exports = function (env) {
  return {
    context: paths.src,
    entry: paths.entry,
    output: {
      filename: 'js/app.[chunkhash].bundle.js',
      publicPath: '/',
      path: paths.build,
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    mode: env,
    target: ['web'],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['module', 'browser', 'main'],
      alias: {
        '~': paths.src,
        '@root': paths.root,
        '@ui': paths.ui,
      },
    },
    module: {
      rules: [
        createTsLoader({ env }),
        createCssLoader({ env }),
        createCssModuleLoader({ env }),
        createScssLoader({ env }),
        createScssModuleLoader({ env }),
        createImageLoader({ env }),
        createFontLoader({ env }),
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: '**/*',
            context: paths.public,
            to: paths.build,
          },
        ],
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: paths.tsconfig,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new SVGSpritemapPlugin('src/view/assets/icons/*.svg', {
        output: {
          svgo: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
          filename: 'icons/spritemap.svg',
        },
      }),
      new SVGSpritemapPlugin('src/view/assets/icons/raw/*.svg', {
        output: {
          filename: 'icons/raw-spritemap.svg',
        },
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, JSON.stringify(process.env)),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new HtmlWebpackPlugin({
        title: appTitle,
        template: paths.html,
        filename: 'index.html',
        ...(env === PROD_MODE
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : {}),
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: false,
      }),
      env === DEV_MODE && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
    ].filter(Boolean),
  };
};
