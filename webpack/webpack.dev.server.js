var express = require('express');
var webpack = require('webpack');

var config = require('../config/config');
var webpackConfig = require('./webpack.config.client.development.babel.js');

webpackConfig.mode = 'development';

var compiler = webpack(webpackConfig);

var host = 'localhost';
var port = 3001;

var serverOptions = {
  contentBase: 'http://' + 'localhost' + ':' + 3001,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' }
};

var app = new express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

// app.listen(port, function onAppListening(err) {
app.listen(port, function (err) {
  if (err) {
    console.error('>>>>>> webpack.dev.server > Express DEV server connection Error', err);
  } else {
    console.error('>>>>>> webpack.dev.server > Express DEV server listening on port', port);
  }
});
