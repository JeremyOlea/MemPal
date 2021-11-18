'use strict'; // make sure we don't actually make any global variables

const Hapi = require('@hapi/hapi');

const init = async() => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 1234
    });

    server.state('session', {
        ttl: 1000 * 60 * 60,
        encoding: 'base64json'
    });

    server.route(require('./routes'));

    await server.start();
    console.group(`Server Started on: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
