const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { PROD_MODE } = require('./constants');

/**
 * Webpack prod config
 */
module.exports = merge(common(PROD_MODE), {
  mode: PROD_MODE,
});
