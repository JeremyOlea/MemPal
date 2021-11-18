'user strict';

const db = require('./db');
const helper = require('./helper');

module.exports = [
    {
        method: 'POST',
        path: '/api/authentication/login',
        handler: async function (request, h) {
            try {
                // params
                const inputEmail = request.payload.email;
                console.log(inputEmail);
                // const inputPassword = request.payload.password;
                const user = await db.query('SELECT * FROM USER WHERE Email=?;', [inputEmail]);
                return helper.goodResponse(h, user[0]);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/authentication/example',
        handler: (request, h) => {
            data = 'hello world'
            return helper.goodResponse(h, data);
        }
    },
    {
        method: 'POST',
        path: '/api/authentication/postExample',
        handler: (request, h) => {
            data = request.payload.email;
            return helper.goodResponse(h, data);
        }
    },
]