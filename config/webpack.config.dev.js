/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const reactConfig = require('./webpack.config.react');
const networks = require('./networks');
/* eslint-enable import/no-extraneous-dependencies */

require('dotenv').config();

const network = networks[process.env.CHAIN_VERSION];

module.exports = merge(baseConfig, reactConfig, {
  output: {
    path: resolve(__dirname, '../app', '../dist'),
    filename: 'bundle.[name].js',
  },
  devServer: {
    contentBase: 'src',
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    proxy: {
      '/api': {
        target: network.mServerURL,
        secure: false,
      },
      '/faucetRequest': {
        target: network.faucetURL,
        pathRewrite: { '^/faucetRequest': '/api/faucetRequest' },
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false,
      TEST: false,
      // because of https://fb.me/react-minification
      'process.env': {
        NETWORK_CODE: JSON.stringify(network.code),
        NODE_ENV: null,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
});
