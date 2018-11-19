/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const reactConfig = require('./webpack.config.react');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = merge(baseConfig, reactConfig, {
  output: {
    path: resolve(__dirname, '../app', '../dist'),
    filename: 'bundle.[name].js',
  },
  devServer: {
    contentBase: 'src',
    disableHostCheck: true,
    historyApiFallback: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // },
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://testnet-explorer.medibloc.org',
        secure: false,
      },
      '/faucetRequest': {
        target: 'https://event.medibloc.org',
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
        NODE_ENV: null,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
});
