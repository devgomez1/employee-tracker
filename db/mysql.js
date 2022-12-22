const mysql = require('mysql2')

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Biglemonbo1!',
    database: 'company_db'
});

module.exports = sql;