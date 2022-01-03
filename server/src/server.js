'use strict'; // make sure we don't actually make any global variables

const Hapi = require('@hapi/hapi');
const { updateDocumentData, getDocumentById } = require('./content-model');
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

const init = async() => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 1234
    });

    server.state('session', {
        ttl: 1000 * 60 * 60,
        encoding: 'base64json'
    });

    await server.register([
        {
          plugin: require('hapi-cors'),
        },
        {
          plugin: require('hapi-auth-cookie'),
          options: {}
        },
    ]);


    server.route(require('./routes'));

    await server.start();
    console.group(`Server Started on: ${server.info.uri}`);
}

const socketInit = async() => {
    io.on('connection', socket => {
        console.log('connected to socket');
        socket.on('get-document', async documentId => {
            let data = await getDocumentById(documentId);
            data = JSON.parse(data)
            socket.join(documentId);
            socket.emit('load-document', data);
            
            socket.on('send-changes', delta => {
                socket.broadcast.to(documentId).emit('receive-changes', delta)
            });

            socket.on('save-document', async data => {
                console.log('saving...');
                data = JSON.stringify(data);
                await updateDocumentData(documentId, JSON.stringify({ data }));
            });
        });
    });
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
socketInit();
