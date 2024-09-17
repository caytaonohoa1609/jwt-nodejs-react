import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt); // Password muốn băm
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Promise: bluebird });

    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
                [email, hashPass, username]);
    } catch (e) {
        console.log(">>> check error: ", e)
    }


}

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('Select * from users');
        return rows;
    } catch (e) {
        console.log("check error: ", e)
    }

}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows;
    } catch (e) {
        console.log("check error: ", e)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        return rows;
    } catch (e) {
        console.log("check error: ", e)
    }
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ? ', [email, username, id]);
        return rows;
    } catch (e) {
        console.log("check error: ", e)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}