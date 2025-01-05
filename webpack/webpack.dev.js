const webpack = require('webpack');
const packageJson = require('../package.json');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new ModuleFederationPlugin({
      name: 'mfe-container',
      remotes: {
        mfeMarketing: `mfeMarketing@${process.env.MFE_MARKETING_DOMAIN}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ].filter(Boolean),
};
