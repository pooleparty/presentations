module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',
  },
};
