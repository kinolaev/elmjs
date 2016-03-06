'use strict'

const path = require('path')


const srcPath = path.join(__dirname, 'src')
const elmPath = path.join(__dirname, '..', '..', 'src')


module.exports = {
  devtool: 'eval',
  entry: srcPath,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      'elm': elmPath
    }
  },
  module: {
    loaders: [ {
      include: [ srcPath, elmPath ],
      test: /\.js$/,
      loaders: [ 'babel' ]
    } ]
  },
  devServer: {
    contentBase: __dirname
  }
}
