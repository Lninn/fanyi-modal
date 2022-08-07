const path = require('path');
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")

require('dotenv').config({ path: './.env' })


const outputPath = path.resolve(__dirname, 'build')

module.exports = {
  mode: "production",
  entry: {
    background: '/src/background.js',
    content: '/src/content.js',
    popup: '/src/popup.js',
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    libraryTarget: "umd",
    clean: true,
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
      "process.env": JSON.stringify(process.env),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'asset') },
      ],
    }),
  ]
};
