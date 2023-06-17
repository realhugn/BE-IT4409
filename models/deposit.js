import {db} from '../configs/db.js'

class Deposit {
    async get(id) {
        try {
            const statement = `select * from deposit where id = ?`
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
            const values = [data.renter_id, data.room_id, data.tien_coc,data.status, data.start_time, data.end_time]
            const statement = `insert into deposit (renter_id, room_id,tien_coc, status, start_time, end_time) values (?,?,?,?,Date(?),Date(?));`
            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM deposit where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.renter_id, data.room_id, data.tien_coc,data.status, data.start_time, data.end_time, data.id]
            const statement = `update deposit set renter_id = ?, room_id = ? , tien_coc = ?, status = ?, start_time = Date(?), end_time = (?) where id = ?;` 
            const rs = await db.query(statement,values)
            console.log(rs)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }
    
    async getDepositHouse(house_id) {
        try {
            const statement = `select deposit.* from deposit,room where room.house_id = ? and room.id = deposit.room_id;` 
            const rs = await db.query(statement,[house_id])
            return rs[0]
        } catch (error) {
            throw error
        }
    }
}

export default new Deposit()