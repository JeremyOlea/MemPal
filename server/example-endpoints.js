'use strict';

const helper = require('./helper');

module.exports = [
    {
        method: 'GET',
        path: '/api/authentication/example',
        handler: (request, h) => {
            const data = 'hello world'
            return helper.goodResponse(h, data);
        }
    },
    {
        method: 'POST',
        path: '/api/authentication/postExample',
        handler: (request, h) => {
            const data = request.payload.email;
            return helper.goodResponse(h, data);
        }
    },
]