/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of the template files in the project
  content: ['./src/**/*.{ts,tsx,html}'],

  // Extend the default theme
  theme: {
    extend: {}, // Add custom styles or override default styles here
  },

  // Extend the default variants
  variants: {
    extend: {}, // Add custom variants or override default variants here
  },

  // Specify the plugins to be used by Tailwind CSS
  plugins: [], // Add Tailwind CSS plugins here
};
