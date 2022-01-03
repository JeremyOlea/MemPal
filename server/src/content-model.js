'use strict';

const db = require('./db');

const createNewFolder = async (Parent_ID, User_ID, Name) => {

    const queryResult = await db.query('INSERT INTO FOLDER SET ?', {
        Parent_ID, 
        User_ID,
        Name
    });

    if (!queryResult.affectedRows) throw new Error('Failed to create folder!');
    return { isValid: true, 
            content_ID: queryResult.insertId
    };
}

const editFolderName = async (Folder_ID, Name) => {
    const queryResult = await db.query(
        `UPDATE FOLDER 
        SET ? 
        WHERE Folder_ID=?`, 
        [{Name}, Folder_ID]);
    
    if (!queryResult.affectedRows) throw new Error('Failed to edit folder name!');
}

const deleteFolder = async (Folder_ID) => {
    await db.query(
        `DELETE FROM FOLDER WHERE Folder_ID=?`, Folder_ID);
}

const createNewDocument = async (Parent_ID, User_ID, Name, Data) => {

    const queryResult = await db.query('INSERT INTO DOCUMENT SET ?', {
        Parent_ID, 
        User_ID,
        Name,
        Data
    });

    if (!queryResult.affectedRows) throw new Error('Failed to create document!');
    return { isValid: true, 
            content_ID: queryResult.insertId
    };
}

const getDocumentById = async (Document_ID) => {
    const queryResult = await db.query(
        `SELECT * FROM DOCUMENT
        WHERE Document_ID=?`, Document_ID);
    
    if (queryResult.length == 0) {
        return '';
    }

    const res = JSON.parse(queryResult[0]['Data']);
    return res['data'];
}

const updateDocumentData = async (Document_ID, Data) => {
    const queryResult = await db.query(
        `UPDATE DOCUMENT
        SET ?
        WHERE Document_ID=?`,
    [{Data}, Document_ID]);

    if (!queryResult.affectedRows) throw new Error('Failed to update document!');
}

const editDocumentName = async (Document_ID, Name) => {
    const queryResult = await db.query(
        `UPDATE DOCUMENT
        SET ?
        WHERE Document_ID=?`,
    [{Name}, Document_ID]);

    if (!queryResult.affectedRows) throw new Error('Failed to edit document name!');
}

const deleteDocument = async (Document_ID) => {
    await db.query(
        `DELETE FROM DOCUMENT WHERE Document_ID=?`, Document_ID);
}

const getAllContent = async (User_ID) => {
    const res_docs = await db.query(
        `SELECT * FROM DOCUMENT WHERE User_ID=?`, User_ID
    );

    const res_folders = await db.query(
        `SELECT * FROM FOLDER WHERE User_ID=?`, User_ID
    );
    
    let result = [];
    createTreeData(result, null, res_docs, res_folders);
    return { result };
}

const createTreeData = (result, parent_id, res_docs, res_folders) => {
    for(let i = 0; i < res_docs.length; i++) {
        let doc = res_docs[i];
        if (doc['Parent_ID'] == parent_id) {
            result.push({
                id: doc['Document_ID'],
                parent_id: doc['Parent_ID'],
                type: 'document',
                name: doc['Name'],
                children: [],
            });
        }
    }

    for(let i = 0; i < res_folders.length; i++) {
        let folder = res_folders[i];
        if (folder['Parent_ID'] == parent_id) {
            let folder_obj = {
                id: folder['Folder_ID'],
                parent_id: folder['Parent_ID'],
                type: 'folder',
                name: folder['Name'],
            };
            let children = [];
            createTreeData(children, folder['Folder_ID'], res_docs, res_folders);
            folder_obj['children'] = children
            result.push(folder_obj);
        }
    }
}

module.exports = { createNewFolder, editFolderName, 
    createNewDocument, updateDocumentData, editDocumentName,
    deleteFolder, deleteDocument, getAllContent, getDocumentById };