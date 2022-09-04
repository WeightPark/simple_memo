const mysql = require('mysql2');

const connection = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'simple_memo',
    password : '78aktmxj',
    dateStrings: 'date'
});

module.exports = connection;