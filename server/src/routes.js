'use strict';
const authentication = require('./authentication-controller');
const example = require('./example-endpoints');
const content = require('./content-controller')

module.exports = [].concat(authentication, example, content);