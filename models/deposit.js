import {db} from '../configs/db.js'

class Deposit {
    async get(id) {
        try {
            const statement = `
                select 
                    deposit.*, room.name as ?, renter.name as ?, house.name as ?, house.id as ? , renter.phone as ?, renter.birthday as ?, renter.gender as ?
                from   
                    deposit, room, renter, house 
                where 
                    deposit.id = ? and 
                    deposit.room_id = room.id and 
                    deposit.renter_id = renter_id and 
                    house.id = room.house_id`
            const rs = await db.query(statement, ['room_name', 'renter_name', 'house_name', 'house_id', 'renter_phone', 'renter_birthday', 'renter_gender', id])
            if(rs[0].length > 0) {
                rs[0][0]['start_time'] = new Date(rs[0][0].start_time).toLocaleDateString("sv-SE")
                rs[0][0]['end_time'] = new Date(rs[0][0].end_time).toLocaleDateString("sv-SE")
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
            const values = [data.renter_id, data.room_id, data.tien_coc,data.status, data.start_time, data.end_time]
            const statement = `insert into deposit (renter_id, room_id,tien_coc, status, start_time, end_time) values (?,?,?,?,Date(?),Date(?));`
            await db.query(`update room set status = "DEPOSIT_ROOM";`)
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
            await db.query(`update room set status = "EMPTY_ROOM";`)
            return rs
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.tien_coc,data.status, data.start_time, data.end_time, data.id]
            const statement = `update deposit set tien_coc = ?, status = ?, start_time = Date(?), end_time = (?) where id = ?;` 
            const rs = await db.query(statement,values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }
    
    async getDepositHouse(house_id) {
        try {
            const statement = `
                select 
                    deposit.*, room.name as ?, renter.name as ?, house.name as ?, house.id as ? , renter.phone as ?, renter.birthday as ?, renter.gender as ? 
                from 
                    deposit, room, house, renter 
                where 
                    house.id = room.house_id and 
                    deposit.room_id = room.id and 
                    house.id = ? and 
                    deposit.renter_id = renter.id;` 
            const rs = await db.query(statement,["room_name", "renter_name", "house_name", "house_id", 'renter_phone', 'renter_birthday', 'renter_gender', house_id])
            for (let i in rs[0]){
                rs[0][i]['start_time'] = new Date(rs[0][i].start_time).toLocaleDateString("sv-SE")
                rs[0][i]['end_time'] = new Date(rs[0][i].end_time).toLocaleDateString("sv-SE")
                rs[0][i]['renter_birthday'] = new Date(rs[0][i].renter_birthday).toLocaleDateString("sv-SE")
            }
            return rs[0]
        } catch (error) {
            throw error
        }
    }
}

export default new Deposit()