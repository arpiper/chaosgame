var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var merge = require('webpack-merge');
var ENV = process.env.NODE_ENV || 'development';

var common = {
  entry: {
    'polyfills': 'babel-polyfill',
    'index': './src/index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.js',],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: "svelte-loader"
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015", "stage-0"]
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency'
    })
  ]
};

var config;
if (ENV === 'production') {
  // production
  config = merge(common, {
     plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        //mangle: {
        //  screw_ie8: true,
        //  keep_fnames: true
        //},
        comments: false
      })
    ],
  });
} else {
  // development
  config = merge(common, {
    devtool: 'cheap-module-source-map',

    entry:  [
      "./src/index.js",
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8090"
    ],

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: './dist/',
      sourceMapFilename: '[name].map'
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    
    devServer: {
      port: 7777,
      host: 'localhost',
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
      publicPath: './dist/', 
    }
  });
}

module.exports = config;
