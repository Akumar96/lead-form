var webpack   = require('webpack');
var path    = require('path');

var BUILD_DIR   = path.resolve(__dirname, 'dist');
var APP_DIR   = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
  path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      },
      { 
        test: /\.scss$/, 
        loaders: ["style", "css", "sass"]
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?mimetype=image/png" 
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ]
};

module.exports = config;