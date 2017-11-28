module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  rules: {
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // git will switch LF based on OS, so rule should switch also
    'linebreak-style': ['error', (require('os').EOL === '\r\n' ? 'windows' : 'unix')],

    // ignore 'next' argument that denotes middleware in express
    // ( https://expressjs.com/en/guide/using-middleware.html )
    // ( https://github.com/eslint/eslint/issues/1494 )
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],

    'no-console': ['off'],

    'arrow-body-style': ['off']
  },
};
