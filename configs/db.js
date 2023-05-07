import * as mysql from 'mysql2'

export const pool = mysql.createConnection({
    host: "localhost",
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
})