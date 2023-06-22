import {db} from '../configs/db.js'

class Covenant {
    async get(id) {
        try {
            const statement = `select * from covenant where id = ?`
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
            const values = [ data.room_id,data.renter_id, data.duration,data.pay_time,data.pre_pay, data.note, data.started_date,data.end_date]
            const statement = `insert into covenant (room_id, renter_id, duration,pay_time,pre_pay, note, started_date, end_date) values (?,?,?,?,?,?,DATE(?),DATE(?));`
            const rs = await db.query(statement, values)
            await db.query(`update room set status = "USING_ROOM";`)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM covenant where id = ? ;` 
            const rs = await db.query(statement,[id])
            await db.query(`update room set status = "EMPTY_ROOM";`)
            return rs
        } catch (error) {
            throw error
        }
    }

    async covenant_renter(id) {
        try {
            const statement = `select covenant.* from covenant, renter where renter.id = covenant.renter_id and covenant.renter_id = ?;`
            const rs = await db.query(statement, [id]);
            if(rs[0].length > 0) {
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }

    async covenant_house (id) {
        try {
            const statement = `select covenant.* from covenant, house, room where house.id = room.house_id and covenant.room_id = room.id and house.id = ?;`
            const rs = await db.query(statement, [id])
            return rs[0]
        } catch (error) {
            throw error
        }
    }

}

export default new Covenant()