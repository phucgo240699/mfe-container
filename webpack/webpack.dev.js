const webpack = require('webpack');
const packageJson = require('../package.json');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Helper function to create remote entry promise
const createRemoteEntry = (remoteName, remoteUrl) => {
  return `promise new Promise(resolve => {
    const script = document.createElement('script');
    script.src = '${remoteUrl}/remoteEntry.js';
    script.onload = () => {
      const proxy = {
        get: (request) => window['${remoteName}'].get(request),
        init: (arg) => {
          try {
            return window['${remoteName}'].init(arg);
          } catch(e) {
            console.log('remote container already initialized');
          }
        }
      };
      resolve(proxy);
    };
    script.onerror = () => {
      console.error('Failed to load ${remoteName} remote at', '${remoteUrl}/remoteEntry.js');
      resolve({ get: () => () => null, init: () => null });
    };
    document.head.appendChild(script);
  })`;
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    historyApiFallback: true,
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
        mfeMarketing: createRemoteEntry(
          'mfeMarketing',
          process.env.MFE_MARKETING_DOMAIN
        ),
        mfeDashboard: createRemoteEntry(
          'mfeDashboard',
          process.env.MFE_DASHBOARD_DOMAIN
        ),
        mfeAuthentication: createRemoteEntry(
          'mfeAuthentication',
          process.env.MFE_AUTHENTICATION_DOMAIN
        ),
      },
      shared: packageJson.dependencies,
    }),
  ].filter(Boolean),
};
