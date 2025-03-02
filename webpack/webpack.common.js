// Import the 'path' module to handle and transform file paths
const path = require('path');

// Import the 'html-webpack-plugin' to simplify the creation of HTML files to serve your bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Define the entry point of the application
  entry: path.resolve(__dirname, '..', 'src/index.tsx'),

  // Configure how modules are resolved
  resolve: {
    // Specify the file extensions to be used
    extensions: ['.tsx', '.ts', '.jsx', '...'],
    // Create aliases to import or require certain modules more easily
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },

  // Define module rules to handle different types of files
  module: {
    rules: [
      {
        // Use style-loader, css-loader, and sass-loader for .module.scss and .module.sass files
        test: /\.module\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // Use style-loader and css-loader for .module.css files with CSS modules enabled
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
            },
          },
        ],
      },
      {
        // Use style-loader, css-loader, and sass-loader for .scss and .sass files
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        // Use style-loader, css-loader, and postcss-loader for .css files
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'tailwindcss'],
              },
            },
          },
        ],
      },
      {
        // Use babel-loader for .ts, .tsx, .js, and .jsx files, excluding node_modules
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // Handle image files and output them as asset resources
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        // Handle font and SVG files and output them as inline assets
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  // Define plugins to extend webpack's functionality
  plugins: [
    // Generate an HTML file from a template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
};
