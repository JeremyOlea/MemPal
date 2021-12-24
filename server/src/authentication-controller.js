'use strict';

const helper = require('./helper');
const authenticationModel = require('./authentication-model');

module.exports = [
    {
        method: 'POST',
        path: '/api/authentication/signup',
        handler: async function (request, h) {
            try {
                //params needed
                const inputEmail = request.payload.email;
                const inputPassword = request.payload.password;
                const res = await authenticationModel.signup(inputEmail, inputPassword);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/authentication/login',
        handler: async function (request, h) {
            try {
                // params
                const inputEmail = request.payload.email;
                const inputPassword = request.payload.password;
                const credentials = await authenticationModel.login(inputEmail, inputPassword);
                
                //cookie creation
                let cookie = request.state.session;
                if (!cookie) {
                    cookie = {
                        username: inputEmail,
                        firstVisit: false
                    }
                }

                cookie.lastVisit = Date.now();
                h.response().state('session', cookie);
                return helper.goodResponse(h, credentials);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    }
]