// Import the 'path' module to handle and transform file paths
const path = require('path');

// Import the TerserPlugin for JavaScript minification
const TerserPlugin = require('terser-webpack-plugin');

// Import the MiniCssExtractPlugin to extract CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Import the CssMinimizerPlugin for CSS minification
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// Import the Module Federation plugin to enable module federation
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Import the package.json file to access project dependencies
const packageJson = require('../package.json');

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
  // Set the mode to production
  mode: 'production',

  // Configure optimization settings
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // Use TerserPlugin and CssMinimizerPlugin for minification
  },

  // Define plugins to extend webpack's functionality
  plugins: [
    // Extract CSS into separate files with content hashes for cache busting
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

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
  ],

  // Configure the output settings
  output: {
    publicPath: '/', // Base URL for all assets
    clean: true, // Clean the output directory before emitting files
    filename: 'main.js', // Output file name
    path: path.resolve(__dirname, '..', 'dist'), // Output directory
  },
};
