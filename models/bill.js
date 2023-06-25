import { db } from '../configs/db.js'
import Covenant from './covenant.js'
import Room from './room.js'

class Bill {
    async get(id) {
        try {
            const statement = `select bill.*
                from bill, bill_service, service where bill.id = ?`
            const rs = await db.query(statement, [id,id])
            if (rs[0].length > 0) {
                const services = await db.query(`select service.*, bill_service.num from service, bill_service where bill_service.service_id = service.id and bill_service.bill_id = ?`, [rs[0][0].id])
                const bill = {...rs[0][0], services: services[0]}
                return bill
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }


    async create(data) {
        try {
            const pre_bill = await db.query(`select * from bill order by created_at DESC LIMIT 1;`)
            const debt = pre_bill[0][0].total_price - pre_bill[0][0].paid
            const statement = `insert into bill (covenant_id, debt, total_price) values (?,?,0);`
            const rs = await db.query(statement, [data.covenant_id, debt])
            for(let i = 0; i < data.services.length;i++) {
                const statement = `insert into bill_service (service_id,bill_id,num) values (?,?,?);`
                await db.query(statement, [data.services[i].id, rs[0].insertId, data.services[i].num])
            }
            await this.total_price(rs[0].insertId)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async total_price(id) {
        try {
            const bill = await this.get(id)
            const covenant = await Covenant.get(bill.covenant_id)
            const room = await Room.get(covenant.room_id)
            let price = 0;
            for (let i = 0; i<bill.services.length;i++) {
                price += bill.services[i].num * bill.services[i].cost 
            }
            price = price + room.cost + bill.debt
            await db.query(`update bill set  total_price = ? where bill.id = ? ;`, [price, id])
            return price
        } catch (error) {
            throw error
        }
    }


    async update(bill_id,data) {
        try {

            const values = [ data.covenant_id, data.status,data.paid, bill_id]
            const statement = `update bill set covenant_id = ? ,status= ?, paid = ?, updated_at = now() where id = ? ;`
            await db.query(statement, values)
            for (let i = 0 ; i < data.services.length ;i ++) {
                await db.query(`update bill_service set num = ? where service_id =? and bill_id = ?`, [data.services[i].num, data.services[i].id, bill_id])
            }
            await this.total_price(bill_id)
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
                return rs[0]
            } else {
                return []
            }
        } catch (error) {
            throw error
        }
    }

    async getBillByRenter(renter_id) {
        try {
            const statement = `select bill.* from bill, renter,covenant where renter.id = ? and renter.id = covenant.renter_id  and bill.covenant_id = covenant.id;`
            const rs = await db.query(statement, [renter_id])
            const bills = []
            for (let i = 0; i < rs[0].length ; i++) {
                const x = await this.get(rs[0][i].id)
                bills.push(x)
            }
            return bills
        } catch (error) {
            throw error
        }
    }
}

export default new Bill()