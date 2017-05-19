'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')

var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel-loader' ], exclude: [ /node_modules/ ] },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  output: {
    library: '<%= appName %>',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  }
}
if (process.env.NODE_ENV === 'production') {
  config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      }
    }),
    new webpack.BannerPlugin({
      banner: '<%= appName %>.js v' + pkg.version + ' | (c) <%= githubUser %>',
      raw: false,
      entryOnly: true
    })
  ])
}

module.exports = config
