// const withCSS = require('@zeit/next-css');
// require('dotenv').config();
// const webpack = require('webpack');

// module.exports = withCSS({
//     target: 'serverless',
//     webpack: (config) => {
//       config.plugins.push(
//         new webpack.EnvironmentPlugin(process.env)
//       );
  
//       return config
//     },
// });

const withCSS = require('@zeit/next-css');

// el parámetro target previene errores de deploy
module.exports = withCSS({
    target: 'serverless'
});