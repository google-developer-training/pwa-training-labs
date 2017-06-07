const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [
    new WorkboxPlugin({
      globDirectory: './build/',
      globPatterns: ['**\/*.{html,js,css}'],
      globIgnores: ['admin.html'],
      swSrc: './app/service-worker.js',
      swDest: './build/service-worker.js',
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
