import * as mysql from 'mysql2'
const pool = mysql.createConnection({
    host: "localhost",
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
})

pool.connect((err) => {
    if(err) throw err
    console.log('Connected to MYSQL')
})

export const db = pool.promise()