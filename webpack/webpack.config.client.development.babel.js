// require("@babel/polyfill");
const webpack = require('webpack');
const dllHelpers = require('./dllreferenceplugin');
const path = require('path');

const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const base_configuration = require('./webpack.config');
const config = require('../config/config');

// const host = config.HOST || 'localhost';
// const port = config.PORT + 1 || 3001;

const serverPath = path.resolve(base_configuration.context, './build/server');
const webpackDllsPath = path.resolve(base_configuration.context, './dlls/');

const settings = require('./universal-webpack-settings');
const { clientConfiguration } = require('universal-webpack');

// ==============================================================================================

const { addDevServerConfiguration, setDevFileServer } = require('./devserver');

console.warn('>>>>>> webpack.config.client.development.babel > addDevServerConfiguration: ', addDevServerConfiguration);
console.warn('>>>>>> webpack.config.client.development.babel > setDevFileServer: ', setDevFileServer);

// base_configuration.output.publicPath = config.devServerPath;

// var validDLLs = dllHelpers.isValidDLLs('vendor', configuration.output.path);
var validDLLs = dllHelpers.isValidDLLs('vendor','/');

if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('>>>>>> webpack.config.client.development.babel > WEBPACK_DLLS disabled !! <<<<<<<<<<');
};

// ==============================================================================================

let configuration = clientConfiguration(base_configuration, settings);

// ==============================================================================================

configuration = addDevServerConfiguration(configuration);

// ==============================================================================================

configuration.mode = 'development';

// https://webpack.js.org/guides/development/#source-maps
// configuration.devtool = 'cheap-eval-source-map'
// configuration.devtool = 'source-map';
configuration.devtool = 'inline-source-map';

configuration.output.filename = '[name].[hash].js';
configuration.output.chunkFilename = '[name].[chunkhash].chunk.js';
configuration.output.publicPath = config.assetsPath;

// https://babeljs.io/docs/en/next/babel-polyfill.html
// If you are using ES6's import syntax in your application's entry point, 
// you should instead import the polyfill at the top of the entry point 
// to ensure the polyfills are loaded first
configuration.entry.main.push(
  'bootstrap-loader',
  './client/index.js',
);

configuration.module.rules.push(
  // {
  //   enforce: 'pre',
  //   test: /\.jsx?$/,
  //   loader: 'eslint-loader',
  //   exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
  //   options: { 
  //     emitWarning: true 
  //   }
  // },
  {
    test: /\.(scss)$/,
    use: [
      {
        loader: 'style-loader',
        options: { 
          sourceMap: true 
        }
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          importLoaders: 3,
          sourceMap: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(configuration.context, 'client/assets/scss/app/functions.scss'),
            path.resolve(configuration.context, 'client/assets/scss/app/variables.scss'),
            path.resolve(configuration.context, 'client/assets/scss/app/mixins.scss'),
          ],
        },
      },
    ]
  },
  {
    test: /\.(css)$/,
    use: [
      {
        loader: 'style-loader',
        options: { 
          sourceMap: true 
        }
      },
      {
        loader : 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader : 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      },
    ]
  },
);

// ==============================================================================================

configuration = setDevFileServer(configuration)

// ==============================================================================================

configuration.plugins.push(

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
  }),

  new ReactLoadablePlugin({
    filename: path.join(configuration.output.path, 'loadable-chunks.json')
  }),

  new webpack.NamedModulesPlugin(),

);

// ==============================================================================================

module.exports = configuration;

console.log('>>>>>>>>>>>>>> WEBPACK DEV > CONFIG >>>>>>>>>>>>>>>: ', configuration);
// console.log('>>>>>>>>>>>>>> WEBPACK DEV > CONFIG RULES >>>>>>>>>: ', configuration.module.rules);

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  dllHelpers.installVendorDLL(configuration, 'vendor');
};
