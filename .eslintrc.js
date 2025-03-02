module.exports = {
  // Specify the parser for TypeScript
  parser: '@typescript-eslint/parser',

  // Specify parser options
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ECMAScript standard
    sourceType: 'module', // Allow the use of imports
  },

  // Specify settings for React
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },

  // Extend recommended configurations
  extends: [
    'plugin:react/recommended', // Use recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended', // Use recommended rules for React hooks
    'plugin:@typescript-eslint/recommended', // Use recommended rules from @typescript-eslint/eslint-plugin
    'plugin:import/errors', // Use rules to help with import/export syntax
    'plugin:import/warnings', // Use rules to help with import/export syntax
    'plugin:import/typescript', // Use rules to help with TypeScript import/export syntax
    'plugin:jsx-a11y/recommended', // Use recommended rules for accessibility
    'plugin:eslint-comments/recommended', // Use recommended rules for eslint comments
    'prettier', // Use prettier for code formatting
    'plugin:prettier/recommended', // Use recommended rules for prettier
  ],

  // Specify custom rules
  rules: {
    'no-unused-vars': 'off', // Disable the no-unused-vars rule
    '@typescript-eslint/no-unused-vars': ['error'], // Enable the no-unused-vars rule from @typescript-eslint
    '@typescript-eslint/no-var-requires': 'off', // Disable the no-var-requires rule
    'react/prop-types': 'off', // Disable the prop-types rule
    'react/jsx-uses-react': 'off', // Disable the jsx-uses-react rule
    'react/react-in-jsx-scope': 'off', // Disable the react-in-jsx-scope rule
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable the explicit-module-boundary-types rule
    '@typescript-eslint/no-require-imports': 'off', // Disable the no-require-imports rule
    'eslint-disable-next-line': 'react/no-unescaped-entities', // Disable the no-unescaped-entities rule
  },
};
