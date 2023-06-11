import { db } from '../configs/db.js'

class Bill {
    async get(id) {
        try {
            const statement = `select * from bill where id = ?`
            const rs = await db.query(statement, [id])
            if (rs[0].length > 0) {
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
            const values = [data.covenant_id, data.total_price, data?.debt ?? 0]
            const statement = `insert into bill (covenant_id, total_price, debt) values (?,?,?);`
            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }



    async update(bill_id,data) {
        try {
            const values = [ data.total_price, data?.debt ?? 0, bill_id]
            console.log(values);
            const statement = `update bill set total_price = ?, debt = ?, updated_at =now() where bill.id = ? ;`
            await db.query(statement, values)
            return await this.get(bill_id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM bill where id = ? ;`
            const rs = await db.query(statement, [id])
            return rs
        } catch (error) {
            throw error
        }
    }

    async getBillsByHouseId(house_id){
        try {
            const statement = `select bill.* from bill
            left join covenant on bill.covenant_id=covenant.id
            left join room on covenant.room_id=room.id
            left join house on room.house_id=house.id
            where house.id=?
            group by bill.id
            order by bill.created_at;
            `
            const rs = await db.query(statement, [house_id])
            if (rs[0].length > 0) {
                return rs
            } else {
                return []
            }
        } catch (error) {
            throw error
        }
    }
}

export default new Bill()