const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');

function getEnvVariables(envVarsPath) {
  if (fs.existsSync(envVarsPath)) {
    const envVarsRaw = dotenv.config({ path: envVarsPath }).parsed;
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
  const envConfig = require(`./webpack.${env}.js`);
  let config = merge(commonConfig, envConfig);

  // Environment variables
  const commonVarsPath = path.resolve(__dirname, '..', 'env/.env');
  const envVarsPath = path.resolve(__dirname, '..', `env/.env.${env}`);

  const commonVars = getEnvVariables(commonVarsPath);
  const envVars = getEnvVariables(envVarsPath);
  config = {
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      new webpack.DefinePlugin({
        ...commonVars,
        ...envVars,
      }),
    ],
  };

  return config;
};
