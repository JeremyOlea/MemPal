'use strict';

const helper = require('./helper');
const contentModel = require('./content-model');

module.exports = [
    {
        method: 'POST',
        path: '/api/content/addFolder',
        handler: async function (request, h) {
            try {
                //params needed
                const parent_id = request.payload.parent_id;
                const user_id = request.payload.user_id;
                const folder_name = request.payload.name;
                const res = await contentModel.createNewFolder(parent_id, user_id, folder_name);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/editFolderName',
        handler: async function (request, h) {
            try {
                //params needed
                const folder_id = request.payload.folder_id;
                const folder_name = request.payload.name;
                const res = await contentModel.editFolderName(folder_id, folder_name);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/deleteFolder',
        handler: async function (request, h) {
            try {
                //params needed
                const folder_id = request.payload.folder_id;
                const res = await contentModel.deleteFolder(folder_id);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/addDocument',
        handler: async function (request, h) {
            try {
                //params needed
                const parent_id = request.payload.parent_id;
                const user_id = request.payload.user_id;
                const doc_name = request.payload.name;
                const data = request.payload.data;
                const res = await contentModel.createNewDocument(parent_id, user_id, doc_name, data);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/updateDocument',
        handler: async function (request, h) {
            try {
                //params needed
                const doc_id = request.payload.document_id;
                const data = request.payload.data;
                const res = await contentModel.updateDocument(doc_id, data);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/editDocumentName',
        handler: async function (request, h) {
            try {
                //params needed
                const doc_id = request.payload.document_id;
                const doc_name = request.payload.name;
                const res = await contentModel.editDocumentName(doc_id, doc_name);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/content/deleteDocument',
        handler: async function (request, h) {
            try {
                //params needed
                const doc_id = request.payload.document_id;
                const res = await contentModel.deleteDocument(doc_id);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/content/getAllContent',
        handler: async function (request, h) {
            try {
                //params needed
                const user_id = request.query.user_id;
                const res = await contentModel.getAllContent(user_id)
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    
]