const withCSS = require('@zeit/next-css');
require('dotenv').config();
const webpack = require('webpack');

module.exports = withCSS({
    target: 'serverless',
    webpack: (config) => {
      config.plugins.push(
        new webpack.EnvironmentPlugin(process.env)
      );
  
      return config
    },
});