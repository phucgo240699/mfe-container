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
        mfeMarketing: `mfeMarketing@http://localhost:8081/remoteEntry.js`, // Remote entry for mfeMarketing
      },
      shared: packageJson.dependencies, // Share dependencies from package.json
    }),
  ],

  // Configure the output settings
  output: {
    filename: 'main.js', // Output file name
    path: path.resolve(__dirname, '..', 'dist'), // Output directory
  },
};
