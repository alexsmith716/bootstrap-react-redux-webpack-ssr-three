# bootstrap-react-redux-webpack-ssr-two


## Overview:

App is a continuation of repo 'bootstrap-react-redux-webpack-ssr-two'. Babel 7.x has been re-worked for app.

So, I spent the last few days going over monorepo's, Lerna, Babel, ES5 && ES6. Why?, I noticed the 'website' app in the ['react-router'](https://github.com/ReactTraining/react-router/tree/master/website) repository does not fully work so I decided to re-create the 'website' app. That attempt quickly drew me into the world of Lerna && 'Monorepos'. After a day or so of working on it I realized I had bitten off more than I wanted to handle and moved on. Well, it turns out it was time well spent because the angle I took was to re-create the 'website' app using Babel 7.x && Webpack 4.x. Long story short I realized Babel's 7.x concept of a ['root' directory](https://babeljs.io/docs/en/config-files#project-wide-configuration). I can always use more experience with Babel && ES5/6 so I started a basic SSR app utilizing Babel 7.x and it's concept of 'root' (will upload it shortly). That then made me realize the current app I have been working on needed a review of it's Babel/ECMAScript usage. So, I reviewed the very informative [react-redux-universal-hot-example](https://github.com/bertho-zero/react-redux-universal-hot-example/tree/deps) and re-realized I need more knowledge of 'Dll's, Babel packages (knowledge of the ECMAScript Proposals) && ES5/6.


### To-Do:

  1) Implement `eslint`, `chai` && `jest`

### Babel:

https://github.com/babel/babel/tree/master/packages

https://github.com/babel/babel/pull/7358
https://github.com/babel/babel/issues/7791
https://github.com/babel/babel/issues/7788
https://github.com/babel/babel/issues/7618
https://babeljs.io/docs/en/options
https://babeljs.io/docs/en/config-files
https://babeljs.io/docs/en/v7-migration
https://babeljs.io/docs/en/v7-migration-api

### SCSS:

* Basic Guide:
* https://sass-lang.com/guide

* Built-in Functions:
* http://sass-lang.com/documentation/Sass/Script/Functions.html

* Useful:
* https://gist.github.com/jareware/4738651


### PORTS:

  Server API (api/api.js):
    Port: 3030

  Server Static && init delegate `react-router` rendering (server.js):
    Port: 3000

  Server Dev (webpack-serve):
    Port: 3001


### Code-Splitting:

* utilizing 'dynamic import' format
* benefit: initial payload of app is smaller
* split points get loaded on demand
* entire app based on code splitting pattern via `react-loadable` library
* entire app based on splits (minus App.js, Home.js && NotFound.js)
* examples found in 'client/containers... Loadable.js' modules

* Regarding 'Loadable.js' modules:

* regarding utilization of optional 'webpackChunkName':
* allows the pulling of multiple split points into a single bundle
* split points with the same name will be grouped
* each split point generates a separate bundle
* allows for composition (load multiple resources in parallel)

* webpack wrapps emitted split point chunks in a `webpackJsonp` block

* initially app split points are router based
* feature based split points added later



### Webpack-Serve (references):

  https://github.com/webpack-contrib/webpack-serve
  https://github.com/webpack-contrib/webpack-hot-client
  https://github.com/webpack/webpack-dev-middleware#options
  https://github.com/koajs/cors


### Nodemon:

  https://github.com/remy/nodemon
  By default nodemon monitors the current working directory. 
  *** If you want to take control of that option, use the --watch option >>>> TO ADD SPECIFIC PATHS <<<<


### Webpack development server (webpack-hot-client):


#### Set options for webpack-hot-client:

* CLI: 'webpack-serve --hot-client --config webpack.config.client.development.js'


### Flow:

* A static type checker

* https://flow.org/en/docs/config/ignore/
* https://flow.org/en/docs/config/include/

* Flow needs to know which files to read and watch for changes. This set of files is determined by taking all `[include]` files and excluding all the `[ignore]` files.
* Including a directory recursively includes all the files under that directory.
* The project root directory (where your `.flowconfig` lives) is automatically included.
* Each line in the include section is a path to include. 
* These paths can be relative to the root directory or absolute, and support both single and double star wildcards.

* Ignores are processed AFTER includes. If you both include and ignore a file it will be ignored.

* Flow CLI: Using the command `flow` will type-check your current directory if the `.flowconfig` file is present. 


### Of Note:

* decorators make it possible to annotate and modify classes and properties at ru time
* a higher-order component (HOC aka 'enhancers') refers to a function that accepts a single React component and returns a new React component
* a component transforms props into UI, a HOC transforms a component into another component

* const EnhancedComponent = hoc(BaseComponent);
* import { Provider as ReduxProvider } from 'react-redux';
* const Provider = withContext(ReduxProvider);


### Mongo / Mongoose:

* Multiple Mongo Connections:
* https://mongoosejs.com/docs/connections.html#multiple_connections

* https://mongoosejs.com/docs/
* https://mongoosejs.com/docs/connections.html
* https://mongoosejs.com/docs/promises.html

* https://docs.mongodb.com/manual/reference/connection-string/
