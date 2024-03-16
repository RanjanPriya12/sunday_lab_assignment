const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        const sql = `CREATE TABLE IF NOT EXISTS reports(
        id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
        image TEXT NOT NULL,
        pdf_data LONGBLOB,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    )`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                console.log(`table created`);
            }
        });
        console.log("Mysql Connected");
    }
});

module.exports = connection;
