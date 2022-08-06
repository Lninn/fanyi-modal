const path = require('path');
const webpack = require('webpack')

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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // https://stackoverflow.com/questions/62703393/support-for-the-experimental-jsx-isnt-currently-enabled
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ]
  },
  plugins:[
    // https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ]
};
