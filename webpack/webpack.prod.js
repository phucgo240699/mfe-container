const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ModuleFederationPlugin({
      name: 'mfe-container',
      remotes: {
        mfeMarketing: `mfeMarketing@http://localhost:8081/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
};
