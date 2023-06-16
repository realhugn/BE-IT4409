import {db} from '../configs/db.js'

class Service {
    async get(id) {
        try {
            const statement = `select * from service where id = ?`
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
            const values = [ data.name,data.cost, data.unit,data.description, data.house_id]
            const statement = `insert into service (name, cost, unit,description,house_id) values (?,?,?,?,?);`
            const rs = await db.query(statement, values)
            return await this.get(rs[0].insertId)
        } catch (error) {
            throw error
        }
    }

    async all(id) {
        try {
            const statement = `select * from service where house_id = ?`;
            const rs = await db.query(statement,[id])
            return rs[0]
        } catch (error) {
            throw error
        }
    }

    async update(data) {
        try {
            const values = [data.name, data.cost, data.description,data.unit, data.id]
            const statement = `update service set name = ?, cost = ?, description = ? ,unit =? where id = ? ;`
            await db.query(statement,values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM service where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw error
        }
    }

    async services_in_room(id) {
        try{
            const statement = `Select service.* from service, service_room , room where room.id = service_room.room_id and service.id = service_room.service_id and room.id =  ?;`
            const rs = await db.query(statement, [id])
            return rs[0]
        } catch (error) {
            throw error
        }
    }

    async add_service_to_room(data) {
        try {
            const values = [data.room_id, data.id_services]
            const statement = `insert into service_room (room_id, service_id) values (?,?);`
            for (let x of data.id_services) {
                await db.query(statement, [data.room_id, x])
            }
            return await this.services_in_room(data.room_id);
        }catch (error) {
            throw error
        }
    }

    async remove_service_in_room (data) {
        try {
            const values = [data.room_id, data.service_id]
            const statement = `delete from service_room where room_id = ? and service_id = ?;`
            return await db.query(statement, values);
        }catch (error) {
            throw error
        }
    }
}

export default new Service()