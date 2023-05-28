import {db} from '../configs/db.js'

class House {
    async get(id) {
        try {
            const statement = `select * from houses where id = ?`
            const rs = await db.query(statement, [id])
            if(rs[0].length > 0) {
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }


    async create(data) {
        try {
            const values = [data.size, data.owner_id,data.price, data.location]
            const statement = `insert into houses (size, owner_id,status, price, location) values (?,?,true,?,?);`
            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async all() {
        try {
            const statement = `select * from houses`;
            const rs = await db.query(statement)
            return rs[0]
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.size, data.price, data.location, data.id]
            const statement = `update houses set size = ?, price = ?, location = ?, updated_at =now() where id = ? ;`
            await db.query(statement,values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `update houses set status = false ,updated_at = now() where id = ? ;` 
           await db.query(statement,[id])
            return await this.get(id)
        } catch (error) {
            throw error
        }
    }

    async get_owner_house(owner_id) {
        try {
            const statement = `select * from houses where owner_id = ?`
            const rs = await db.query(statement, [owner_id])
            if(rs[0].length > 0) {
                return rs[0]
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}

export default new House()