'use strict';
const authentication = require('./authentication-controller');
const example = require('./example-endpoints');

module.exports = [].concat(authentication, example);