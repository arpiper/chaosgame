var path = require("path");
var webpack = require("webpack");

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

var entry = PRODUCTION
  ? ["./src/index.js"]
  : [
    "./src/index.js",
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8090"
  ];

var plugins = PRODUCTION
  ? []
  : [
    new webpack.HotModuleReplacementPlugin()
  ];

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    filename: "bundle.js",
    publicPath: '/dist/',
    path: path.resolve(__dirname, "dist")
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: "svelte-loader"
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
      }
    ]
  }
};
