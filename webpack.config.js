var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var merge = require('webpack-merge');
var ENV = process.env.NODE_ENV || 'development';

var common = {
  entry: {
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
    rules: [
      
      {
        test: /\.(js|html)$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        include: [
          path.resolve(__dirname, "src")
        ],
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015", "stage-0"],
          }
        }
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: "svelte-loader"
      },
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
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          keep_fnames: true
        },
        comments: false
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ],
  });
} else {
  // development
  config = merge(common, {
    devtool: 'cheap-module-source-map',

    entry:  [
      "./src/index.js",
    ],

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    
  });
}

module.exports = config;
