import {db} from '../configs/db.js'

class House {
    async get(id) {
        try {
            const statement = `select * from house where id = ?`
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
            const values = [data.name, data.owner_id,data.location, data.description]
            const statement = `insert into house (name, owner_id, location, description) values (?,?,?,?);`
            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async all() {
        try {
            const statement = `select * from house`;
            const rs = await db.query(statement)
            return rs[0]
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.name, data.description, data.location, data.id]
            const statement = `update house set name = ?, description = ?, location = ?, updated_at =now() where id = ? ;`
            await db.query(statement,values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM house where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw error
        }
    }

    async get_owner_house(owner_id) {
        try {
            const statement = `select * from house where owner_id = ?`
            const rs = await db.query(statement, [owner_id])
            return rs[0]

        } catch (error) {
            throw error
        }
    }
}

export default new House()