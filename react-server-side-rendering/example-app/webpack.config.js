const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    clientSSR: './src/client/clientSSR.js',
    clientCSR: './src/client/clientCSR.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
};
