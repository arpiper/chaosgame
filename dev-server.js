var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");
var path = require("path");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: false,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});
server.listen(8090, "localhost", function() {});
