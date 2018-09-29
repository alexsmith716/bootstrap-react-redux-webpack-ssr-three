const webpack = require('webpack');
const path = require('path');
const config = require('../config/config');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { clientConfiguration } = require('universal-webpack');
const settings = require('./universal-webpack-settings');
const configuration = require('./webpack.config');

const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const bundleAnalyzerPath = path.resolve(configuration.context, './build/analyzers/bundleAnalyzer');
const visualizerPath = path.resolve(configuration.context, './build/analyzers/visualizer');
const assetsPath = path.resolve(configuration.context, './build/public/assets');
const serverPath = path.resolve(configuration.context, './build/server');

// reuseExistingChunk: allows to reuse existing chunks instead of creating a new one when modules match exactly.
// Chunks can be configured. There are 3 values possible "initial", "async" and "all". 
// When configured the optimization only selects initial chunks, on-demand chunks or all chunks.

// ==============================================================================================

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

// configuration.devtool = 'source-map';
// configuration.devtool = 'hidden-source-map'; // stack trace info only

configuration.stats = {
  // assets: true,
  // cached: true,
  // entrypoints: false,
  // children: false,
}

// https://webpack.js.org/concepts/entry-points/#single-entry-shorthand-syntax
// Passing an array of file paths to entry property creates a 'multi-main entry'
// inject multiple 'dependent' files together and graph 'their dependencies' into one 'chunk'
configuration.entry.main.push(
  'bootstrap-loader',
  './client/index.js',
);

// ---------------------------------------------------------------------------------------

// STOP THE PRESSES!!!!
// the app appears to work just by specifying (output.filename = 'bundle.js')
// webpack essentially does it's thing without 'output.chunkFilename' and 'optimization.splitChunks'
// vendor bundle is combined into 'bundle.js'
// chunks are numbered, not named, but they still are chunked!!
// universal-weboack and react-loadable work but I will check again on that

// regarding the configuration of 'output' key options:
// affect the naming of bundles and chunks
// affect the caching of files produced by webpack
// https://webpack.js.org/guides/caching/

// output.filename: determines the name of each output bundle
// output.filename: The bundle is written to the directory specified by 'output.path'
configuration.output.filename = 'bundle.js';
// configuration.output.filename = '[name].[chunkhash].bundle.js';

// output.chunkFilename: specifies the name of each (non-entry) chunk files
// output.chunkFilename: main option here is to specify caching
// configuration.output.chunkFilename = '[name].[chunkhash].chunk.js';

// output.publicPath: specifies the public URL of the output directory
// output.publicPath: value is prefixed to every URL created by the runtime or loaders
configuration.output.publicPath = config.publicPath;

configuration.module.rules.push(
  {
    test: /\.(scss)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          importLoaders: 3,
          // sourceMap: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          // sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          // sourceMap: true,
          // sourceMapContents: true
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
      MiniCssExtractPlugin.loader,
      {
        loader : 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          importLoaders: 1,
          // sourceMap: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          // sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      },
    ]
  },
);

configuration.optimization = {
  minimizer: [
    // minify javascript 
    new TerserPlugin(),
    // minify css (default: cssnano)
    new OptimizeCSSAssetsPlugin()
  ],
  // Code Splitting: Prevent Duplication: Use the SplitChunksPlugin to dedupe and split chunks.
  // splitChunks: {
  //   chunks: 'async',
  //   minSize: 30000,
  //   minChunks: 1,
  //   maxAsyncRequests: 5,
  //   maxInitialRequests: 3,
  //   automaticNameDelimiter: '~',
  //   name: true,
  //   cacheGroups: {
  //     vendor: {
  //       name: 'vendor',
  //       // reuseExistingChunk: true,
  //       chunks: chunk => ['main',].includes(chunk.name),
  //       test: module => /[\\/]node_modules[\\/]/.test(module.context),
  //       minChunks: 1,
  //       minSize: 0,
  //     },
  //   },
  // },
  // // splitChunks: {
  // //   // chunks: 'async',
  // //   // chunks: 'initial',
  // //   minSize: 30000,
  // //   maxSize: 0,
  // //   minChunks: 1,
  // //   maxAsyncRequests: 5,
  // //   maxInitialRequests: 3,
  // //   automaticNameDelimiter: '~',
  // //   name: true,
  // //   cacheGroups: {
  // //     vendor: {
  // //       name: 'vendor',
  // //       // reuseExistingChunk: true,
  // //       chunks: 'initial',
  // //       test: /node_modules/,
  // //       // chunks: chunk => ['main',].includes(chunk.name),
  // //       // test: module => /[\\/]node_modules[\\/]/.test(module.context),
  // //       // minChunks: 1,
  // //       // minSize: 0,
  // //       priority: 10,
  // //       enforce: true
  // //     }
  // //   },
  // // },
  // runtimeChunk: {
  //   name: 'manifest'
  // },
  // runtimeChunk: true,
  // occurrenceOrder: true
};

// ==============================================================================================

configuration.plugins.push(

  new CleanWebpackPlugin([bundleAnalyzerPath,visualizerPath,assetsPath,serverPath], { root: configuration.context }),

  new MiniCssExtractPlugin({
    // filename: '[name].css',
    filename: '[name].[contenthash].css.css',
    // chunkFilename: '[name].[contenthash].chunk.css',
  }),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DLLS__: false,
  }),

  new ReactLoadablePlugin({
    filename: path.join(configuration.output.path, 'loadable-chunks.json')
  }),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(configuration.context, './server/pwa.js'),
  }),

  // use service workers to cache external dependencies
  // generate 'service-worker.js' and add it to build directory

  // SWPrecacheWebpackPlugin is a webpack plugin for using service workers to cache your external project dependencies. 
  // It will generate a service worker file using sw-precache and add it to your build directory.

  // new SWPrecacheWebpackPlugin({

  //   cacheId: 'bootstrap-react-redux-webpack-ssr-two',
  //   filename: 'service-worker.js',
  //   maximumFileSizeToCacheInBytes: 8388608,

  //   staticFileGlobs: [path.dirname(configuration.output.path) + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}'],

  //   stripPrefix: path.dirname(configuration.output.path),

  //   directoryIndex: '/',
  //   verbose: true,
  //   navigateFallback: '/assets/index.html',
  // }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../../analyzers/bundleAnalyzer/client-development.html',
    // analyzerMode: 'server',
    // analyzerPort: 8888,
    // defaultSizes: 'parsed',
    openAnalyzer: false,
    generateStatsFile: false
  }),
);

// console.log('>>>>>>>>>>>>>>>>>>> WCCPB CLIENT configuration: ', configuration)
const configurationClient = clientConfiguration(configuration, settings)
// console.log('>>>>>>>>>>>>>>>>>>> WCCPB CLIENT configurationClient: ', configurationClient)

export default configurationClient;
