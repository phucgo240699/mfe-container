// Import the 'fs' module to interact with the file system
const fs = require('fs');

// Import the 'path' module to handle and transform file paths
const path = require('path');

// Import the 'dotenv' module to load environment variables from a .env file
const dotenv = require('dotenv');

// Import the 'merge' function from 'webpack-merge' to merge webpack configurations
const { merge } = require('webpack-merge');

// Import the common webpack configuration
const commonConfig = require('./webpack.common');

// Import the 'webpack' module to access webpack's built-in plugins
const webpack = require('webpack');

// Function to get environment variables from a specified path
function getEnvVariables(envVarsPath) {
  if (fs.existsSync(envVarsPath)) {
    // Load environment variables from the specified path
    const envVarsRaw = dotenv.config({ path: envVarsPath }).parsed;
    // Format the environment variables for webpack DefinePlugin
    const envVars = Object.keys(envVarsRaw).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(envVarsRaw[next]);
      return prev;
    }, {});
    return envVars;
  }
  return {};
}

module.exports = (envs) => {
  const { env } = envs;

  // Load environment variables
  const commonVarsPath = path.resolve(__dirname, '..', 'env/.env');
  const envVarsPath = path.resolve(__dirname, '..', `env/.env.${env}`);
  const commonVars = getEnvVariables(commonVarsPath);
  const envVars = getEnvVariables(envVarsPath);

  // Load environment-specific webpack configuration
  const envConfig = require(`./webpack.${env}.js`);
  // Merge the common configuration with the environment-specific configuration
  let config = merge(commonConfig, envConfig);

  config = {
    ...config,
    plugins: [
      // Merge existing plugins with DefinePlugin to inject environment variables
      ...(config.plugins ?? []),
      new webpack.DefinePlugin({
        ...commonVars,
        ...envVars,
      }),
    ],
  };

  return config;
};
