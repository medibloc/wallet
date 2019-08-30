/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const { NamedModulesPlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FileChanger = require('webpack-file-changer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config');
const reactConfig = require('./webpack.config.react');
const networks = require('./networks');
/* eslint-enable import/no-extraneous-dependencies */

require('dotenv').config();

const network = networks[process.env.CHAIN_VERSION];

module.exports = merge(baseConfig, reactConfig, {
  output: {
    path: resolve(__dirname, '../app', '../app/build'),
    filename: 'bundle.[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: true,
      TEST: false,
      // because of https://fb.me/react-minification
      'process.env': {
        NETWORK_CODE: JSON.stringify(network.code),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        sourceMap: false,
        mangle: false,
      },
    }),
    new NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true,
    }),
    new FileChanger({
      change: [
        {
          file: './index.html',
          parameters: {
            'styles\\.css': 'styles.[hash].css',
            'bundle\\.vendor\\.js': 'bundle.vendor.[hash].js',
            'bundle\\.app\\.js': 'bundle.app.[hash].js',
          },
        },
      ],
    }),
  ],
});
