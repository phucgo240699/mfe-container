module.exports = {
  // Specify the plugins to be used by PostCSS
  plugins: [
    'postcss-preset-env', // Use postcss-preset-env to convert modern CSS into something most browsers can understand
    require('tailwindcss'), // Use Tailwind CSS for utility-first CSS framework
    require('autoprefixer'), // Use Autoprefixer to add vendor prefixes to CSS rules
  ],
};
