const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    background: '/src/background.js',
    content: '/src/content.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'extension'),
    libraryTarget: "umd"
  },
  optimization: {
    minimize: false,
    nodeEnv: false
  },
};
