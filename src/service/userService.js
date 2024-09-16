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

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
        }
    );
}

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt(json web token)', Rromise: bluebird });

    let users = [];
    // connection.query(
    //     'SELECT * FROM users ',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }

    //         users = results;
    //         console.log(">>> run get user list: ", users)
    //         return users;
    //     }
    // );

    try {
        const [rows, fields] = await connection.execute('Select * from users');
        return rows;
    } catch (e) {
        console.log("check error: ", e)
    }

}

module.exports = {
    createNewUser, getUserList
}