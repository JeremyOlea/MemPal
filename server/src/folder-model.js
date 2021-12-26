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
            credentials: { User_ID: queryResult.insertId }
    };
}

const editFolderName = async (Folder_ID, Name) => {
    const queryResult = await db.query(
        `UPDATE FOLDER 
        SET ? 
        WHERE Folder_ID=?`, 
        [{Name}, Folder_ID]);
    
    if (!queryResult.affectedRows) throw new Error('Failed to edit folder!');
}

module.exports = { createNewFolder, editFolderName };