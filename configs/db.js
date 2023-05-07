import * as mysql from 'mysql2'

const pool = mysql.createConnection({
    host: '127.0.0.1',
    user: 'it4409',
    password: '123456',
    database: 'it4409'
})

export default pool