'use strict';

const helper = require('./helper');
const folderModel = require('./folder-model');

module.exports = [
    {
        method: 'POST',
        path: '/api/folder/addFolder',
        handler: async function (request, h) {
            try {
                //params needed
                const parent_id = request.payload.parent_id;
                const user_id = request.payload.user_id;
                const folder_name = request.payload.name;
                const res = await folderModel.createNewFolder(parent_id, user_id, folder_name);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/folder/editFolderName',
        handler: async function (request, h) {
            try {
                //params needed
                const folder_id = request.payload.folder_id;
                const folder_name = request.payload.name;
                const res = await folderModel.editFolderName(folder_id, folder_name);
                return helper.goodResponse(h, res);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
]