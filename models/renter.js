import {db} from '../configs/db.js'

class Renter {
    async create(data) {
        try {
            const values = [data.name, data.phone, data.birthday, data.address, data.email,data.gender]
            const statement = `insert into renter (name, phone, birthday, address ,email, gender, role) values (?,?,?,DATE(?),?,?,?, "renter");`
            await db.query(statement, values)
            const rs =await this.find(data.phone)
            return rs
        } catch (error) {
            throw error
        }
    }

    async get(id) {
        try {
            const values = [id]
            const statement = `select * from renter where id = ?;`
            const rs = await db.query(statement, values)
            if(rs[0].length > 0) {
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error 
        }
    }

    async find(phone) {
        try {
            const values = [phone]
            const statement = `select * from renter where phone = ?;`
            const rs = await db.query(statement, values)
            if(rs[0].length > 0) {
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [ data.phone, data.password, data.name, data.birthday,data.address,data.email,data.gender,data.id]
            const statement = `update renter set phone = ?,password = ?,name = ?, birthday =DATE(?), address=?,email =?,gender = ? ,updated_at = now() where id = ?;`
            await db.query(statement, values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM renter where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw new Error(error);
        }
    }

    async update_pass(data) {
        try {
            const values = [ data.password, data.id]
            const statement = `update renter set password = ?, updated_at = now() where id = ?;`
            await db.query(statement, values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }
}

export default new Renter()