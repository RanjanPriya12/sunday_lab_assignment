import mysql from 'mysql';

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'cropDB'
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        const sql = `CREATE TABLE IF NOT EXISTS crops(
        id integer PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
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
