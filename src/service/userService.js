import bcrypt from 'bcryptjs';
//get the client
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);
//create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt(json web token)'
});


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt); // Password muốn băm
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, hashPass, username],
        function(err, results, fields) {
            if(err) {
                console.log(err)
            }
        }
    );
}

const  getUserList = () => {
    let users = [];
    connection.query(
        'SELECT * FROM users ',
        function(err, results, fields) {
            if(err) {
                console.log(err)
            }
            console.log("check results: ", results)
        }
    );
}

module.exports = {
    createNewUser, getUserList
}