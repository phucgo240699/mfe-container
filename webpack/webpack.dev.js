// Import the 'path' module to handle and transform file paths
const path = require('path');

// Import the 'webpack' module to access webpack's built-in plugins
const webpack = require('webpack');

// Import the package.json file to access project dependencies
const packageJson = require('../package.json');

// Import the React Refresh plugin for fast refresh during development
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Import the Module Federation plugin to enable module federation
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
  // Set the mode to development
  mode: 'development',

  // Enable source maps for easier debugging
  devtool: 'cheap-module-source-map',

  // Configure the development server
  devServer: {
    open: true, // Automatically open the browser
    historyApiFallback: true, // Enable history API fallback for single-page applications
  },

  // Define module rules to handle different types of files
  module: {
    rules: [
      {
        // Use babel-loader for .ts, .tsx, .js, and .jsx files, excluding node_modules
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean), // Enable React Refresh plugin
            },
          },
        ],
      },
    ],
  },

  // Define plugins to extend webpack's functionality
  plugins: [
    // Enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),

    // Enable React Refresh for fast refresh during development
    new ReactRefreshPlugin(),

    // Configure Module Federation
    new ModuleFederationPlugin({
      name: 'mfe-container', // Name of the container
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
      shared: packageJson.dependencies, // Share dependencies from package.json
    }),
  ].filter(Boolean),

  // Configure the output settings
  output: {
    path: path.resolve(__dirname, '..', 'dist'), // Output directory
    filename: 'main.js', // Output file name
    publicPath: '/', // Public URL of the output directory when referenced in a browser
  },
};
