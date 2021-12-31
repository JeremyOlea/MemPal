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

module.exports = { createNewFolder, editFolderName, 
    createNewDocument, updateDocumentData, editDocumentName,
    deleteFolder, deleteDocument };