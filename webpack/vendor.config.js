var path = require('path');
var webpack = require('webpack');
var projectRootPath = path.resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',

  output: {
    path: path.join(projectRootPath, 'build/public/assets/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  performance: {
    hints: false
  },

  entry: {
    vendor: [
      '@babel/polyfill',
      // Generate this list using the following command against the stdout of
      // webpack running against the source bundle config (dev/prod.js):
      //
      // webpack --config webpack/dev.config.js --display-modules | egrep -o '@babel/runtime-corejs2/\S+' | sed 's/\.js$//' | sort | uniq

      '@babel/runtime-corejs2/core-js/array/from',
      '@babel/runtime-corejs2/core-js/get-iterator',
      '@babel/runtime-corejs2/core-js/is-iterable',
      '@babel/runtime-corejs2/core-js/json/stringify',
      '@babel/runtime-corejs2/core-js/number/is-integer',
      '@babel/runtime-corejs2/core-js/number/is-safe-integer',
      '@babel/runtime-corejs2/core-js/object/assign',
      '@babel/runtime-corejs2/core-js/object/create',
      '@babel/runtime-corejs2/core-js/object/define-property',
      '@babel/runtime-corejs2/core-js/object/entries',
      '@babel/runtime-corejs2/core-js/object/get-own-property-names',
      '@babel/runtime-corejs2/core-js/object/get-prototype-of',
      '@babel/runtime-corejs2/core-js/object/keys',
      '@babel/runtime-corejs2/core-js/object/set-prototype-of',
      '@babel/runtime-corejs2/core-js/object/values',
      '@babel/runtime-corejs2/core-js/promise',
      '@babel/runtime-corejs2/core-js/symbol',
      '@babel/runtime-corejs2/core-js/symbol/iterator',
      '@babel/runtime-corejs2/helpers/asyncToGenerator',
      '@babel/runtime-corejs2/helpers/classCallCheck',
      '@babel/runtime-corejs2/helpers/createClass',
      '@babel/runtime-corejs2/helpers/defineProperty',
      '@babel/runtime-corejs2/helpers/extends',
      '@babel/runtime-corejs2/helpers/inherits',
      '@babel/runtime-corejs2/helpers/objectWithoutProperties',
      '@babel/runtime-corejs2/helpers/possibleConstructorReturn',
      '@babel/runtime-corejs2/helpers/slicedToArray',
      '@babel/runtime-corejs2/helpers/toConsumableArray',
      '@babel/runtime-corejs2/helpers/typeof',
      '@babel/runtime-corejs2/regenerator/index',
      // </@babel/runtime-corejs2>

      'axios',
      'bootstrap',
      'final-form',
      'jquery',
      'multireducer',
      'popper.js',
      'react',
      'react-dom',
      'react-final-form',
      'react-helmet',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'connected-react-router',
      'redux',
      'serialize-javascript',
      'socket.io-client'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),


    // Creates a manifest.json which is written to the given path. 
    // It contains mappings from require and import requests, to module ids. 
    // It is used by the DllReferencePlugin.


    new webpack.DllPlugin({
      path: path.join(projectRootPath, 'webpack/dlls/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};
