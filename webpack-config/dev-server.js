const { BUILD_PATH } = require('./constants');

/**
 * Webpack dev server config
 */
module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  static: {
    directory: BUILD_PATH,
    publicPath: '/',
  },
  hot: true,
  compress: true,
  historyApiFallback: true,
  allowedHosts: 'all',
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    reconnect: 3,
  },
};
