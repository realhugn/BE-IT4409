import {db} from '../configs/db.js'

class Room {
    async get(id) {
        try {
            const statement = `select * from room where id = ?`
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
            let values = [data.name, data.house_id,data.max_user, data.description, 'EMPTY_ROOM', data.cost]
            let statement = `insert into room (name, house_id, max_user, description,status,cost) values (?,?,?,?,?,?);`

            if (!data.status){
                values = [data.name, data.house_id,data.max_user, data.description, data.cost]
                statement = `insert into room (name, house_id, max_user, description, cost) values (?,?,?,?,?);`
            }

            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async all(id) {
        try {
            const statement = `select * from room  where house_id = ?`;
            const rs = await db.query(statement,[id])
            return rs[0]
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.name, data.max_user, data.description,data.status, data.cost,data.id]
            const statement = `update room set name = ?, max_user = ?, description = ? ,status= ?, cost =? where id = ? ;`
            await db.query(statement,values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM room where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw error
        }
    }
}

export default new Room()