'use strict';
const authentication = require('./authentication-controller');
const example = require('./example-endpoints');
const folder = require('./folder-controller')

module.exports = [].concat(authentication, example, folder);