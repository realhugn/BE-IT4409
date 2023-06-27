import {db} from '../configs/db.js'

class Covenant {
    async get(id) {
        try {
            const statement = `
            select 
                covenant.*, room.name as ?, renter.name as ?, house.name as ?, house.id as ? , renter.phone as ?, renter.birthday as ?, renter.gender as ? 
            from 
                covenant, room, renter, house 
            where 
                covenant.id = ? and 
                covenant.room_id = room.id and 
                covenant.renter_id = renter_id and 
                house.id = room.house_id`
            const rs = await db.query(statement, ['room_name', 'renter_name', 'house_name', 'house_id', 'renter_phone', 'renter_birthday', 'renter_gender', id])
            if(rs[0].length > 0) {
                rs[0][0]['started_date'] = new Date(rs[0][0].started_date).toLocaleDateString("sv-SE")
                rs[0][0]['end_date'] = new Date(rs[0][0].end_date).toLocaleDateString("sv-SE")
                rs[0][0]['pay_time'] = new Date(rs[0][0].pay_time).toLocaleDateString("sv-SE")
                rs[0][0]['renter_birthday'] = new Date(rs[0][0].renter_birthday).toLocaleDateString("sv-SE")
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
            await db.query(`update room set status = "USING_ROOM" where id = ?;`, data.room_id)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.duration, data.pay_time, data.pre_pay, data.note, data.started_date, data.end_date, data.id]

            const statement = `update covenant set duration = ? , pay_time = ? , pre_pay = ? , note = ? , started_date = ? , end_date = ? where id = ?`

            return await db.query(statement, values)

        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM covenant where id = ? ;` 
            const rs = await db.query(statement,[id])
            await db.query(`update room set status = "EMPTY_ROOM" where id = ?;`, data.room_id)
            return rs
        } catch (error) {
            throw error
        }
    }

    async covenant_renter(id) { //get covenant theo renter id
        try {
            const statement = `select covenant.* from covenant, renter where renter.id = covenant.renter_id and covenant.renter_id = ?;`
            const rs = await db.query(statement, [id]);
            if(rs[0].length > 0) {
                rs[0][0]['started_date'] = new Date(rs[0][0].started_date).toLocaleDateString("sv-SE")
                rs[0][0]['end_date'] = new Date(rs[0][0].end_date).toLocaleDateString("sv-SE")
                rs[0][0]['pay_time'] = new Date(rs[0][0].pay_time).toLocaleDateString("sv-SE")
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
            const statement = `
            select 
                covenant.*, room.name as ?, renter.name as ?, house.name as ?, house.id as ? , renter.phone as ?, renter.birthday as ?, renter.gender as ? 
            from 
                covenant, house, room, renter 
            where 
                house.id = room.house_id and 
                covenant.room_id = room.id and 
                house.id = ? and 
                covenant.renter_id = renter.id;`
            const rs = await db.query(statement, [ "room_name", "renter_name", "house_name", "house_id", 'renter_phone', 'renter_birthday', 'renter_gender', id])
            for (let i in rs[0]){
                rs[0][i]['started_date'] = new Date(rs[0][i].started_date).toLocaleDateString("sv-SE")
                rs[0][i]['end_date'] = new Date(rs[0][i].end_date).toLocaleDateString("sv-SE")
                rs[0][i]['pay_time'] = new Date(rs[0][i].pay_time).toLocaleDateString("sv-SE")
                rs[0][i]['renter_birthday'] = new Date(rs[0][i].renter_birthday).toLocaleDateString("sv-SE")
            }
            return rs[0]
        } catch (error) {
            throw error
        }
    }

}

export default new Covenant()