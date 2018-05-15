const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    client: './src/client/client.js',
    bundle: './src/client/bundle.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
};
