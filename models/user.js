import pool from '../configs/db.js'

class User {
    async create(data) {
        try {
            const values = [data.username, data.password, data.phone, data.status]
            const statement = `insert into users (username, password, phone, status) values (?,?,?,?) returning *;`
            const rs = await pool.query(statement, values)
            if(rs.rows.length > 0) {
                return rs.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error
        }
    }

    async get(id) {
        try {
            const values = [id]
            const statement = `select * from users where id = ?;`
            const rs = await pool.query(statement, values)
            if(rs.rows.length > 0) {
                return rs.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [ data.password,data.phone,data.id ]
            const statement = `update users set password = ? , phone = ? ,updated_at = now() where id = ? returning *;`
            const rs = await pool.query(statement, values)
            if(rs.rows.length > 0) {
                return rs.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `update users set status = false ,updated_at = now() where id = ? returning *;` 
            const rs = await db.query(statement,[id])
            return rs.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

}