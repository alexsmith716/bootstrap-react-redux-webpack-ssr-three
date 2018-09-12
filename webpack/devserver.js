const config = require('../config/config');

console.log('>>>>>>>>>>>>>> DEVSERVER !!!!!!!!! >>>>>>>>>>>>>>> config: ', config);

// core tenet of 'Redux' is to never mutate object state
// --------------
// compiled configuration objects built with modified/new values from initial 'config' object
// --------------
// Object Spread Syntax '...Object' (create copies of objects with new or updated values)
// --------------
// use 'object spread operator' as opposed to 'Object.assign()' method
// 'Object.assign()' can make simple reducers difficult to read given its verbose syntax
// --------------
// 'object spread operator' >>> ES6 >>> "@babel/plugin-proposal-object-rest-spread"

// return a new 'configuration' object with a new 'serve' property

module.exports = {
  addDevServerConfiguration: addDevServerConfiguration,
  setDevFileServer: setDevFileServer,
};

function addDevServerConfiguration(configuration) {

  return {
    ...configuration,
    serve: {
      port: config.devServerPort,
      devMiddleware: {
        publicPath: config.devServerPath,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    }
  }
}

// return a new 'configuration' object with an updated 'output' property
function setDevFileServer(configuration) {
  return {
    ...configuration,
    output: {
      ...configuration.output,
      publicPath: `http://${config.devServerHost}:${config.devServerPort}${config.devServerPath}`
    }
  }
}

// ========================== 'Object.assign()' ===============================

// let stooge = { 'first-name': 'Moe', 'second-name': 'Larry' };
// stooge['first-name']  // 'Moe'
// console.log('>>>>>>>>>>>>>> stooge >>>>>>>>>>>>>>>: ', stooge['first-name']);
// 
// let stooge2 = { 'first-name': 'Moe' }['first-name']; // 'Moe'
// console.log('>>>>>>>>>>>>>> stooge2 >>>>>>>>>>>>>>: ', stooge2);

// Return a new 'Config' object with a new 'environment' property 
// the value of which is 'retrieved' '[ ]' from object 'environment' based on evaluation of string expression 'process.env.NODE_ENV'

// const environment = {
//   development: { isProduction: false },
//   production: { isProduction: true }
// }[process.env.NODE_ENV || 'development'];
// 
// module.exports = Object.assign( {
//     host: process.env.HOST || 'localhost',
//     port: process.env.PORT,
//     app: {
//       title: 'React Redux Example',
//       head: {
//         titleTemplate: 'React Redux Example: %s',
//         meta: [
//           { name: 'description', content: 'All the modern best practices in one example.' },
//           { charset: 'utf-8' },
//         ]
//       }
//     }
//   },
//   environment
// );
