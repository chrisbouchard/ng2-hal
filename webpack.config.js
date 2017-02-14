const { resolve } = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack/webpack.common.js');
const developmentConfig = require('./webpack/webpack.development.js');
const productionConfig = require('./webpack/webpack.production.js');
const testConfig = require('./webpack/webpack.test.js');

module.exports = env => merge([
  commonConfig(path => resolve(__dirname, path)),
  getProfileConfig(env.profile)(path => resolve(__dirname, path))
]);

function getProfileConfig(profile) {
  switch (profile) {
  case 'development':
    return developmentConfig;

  case 'test':
    return testConfig;
  }

  return productionConfig;
}

