'use strict';

const db = require('./db');

// Bcrypt setup
const Bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (Email, inputPassword) => {
    const Password = Bcrypt.hashSync(inputPassword, saltRounds);

    const signupResults = await db.query('INSERT INTO USER SET ?', {
        Email, 
        Password
    });

    if (!signupResults.affectedRows) throw new Error('Failed to sign up!');
    return { isValid: true, 
            credentials: { User_ID: signupResults.insertId }
        };
}

const login = async (inputEmail, inputPassword) => {
    const user = await db.query('SELECT * FROM USER WHERE Email=?;', [inputEmail]);
    if (!user.length) {
        return { isValid: false, credentials: null };
    }

    const match = await Bcrypt.compare(inputPassword, user[0].Password);
    if (match) {
        return {
            isValid: true,
            credentials: { User_ID: user[0].User_ID }
        };
    }
    return { isValid: false, credentials: null };
}

module.exports = { signup, login };