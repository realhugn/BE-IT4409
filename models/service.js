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

    async services_in_room(id) { //chỉ cần lấy id của service in room thôi
        try{
            const statement = `Select service_room.service_id from service_room , room where room.id = service_room.room_id and room.id = ?;`
            const rs = await db.query(statement, [id])
            let services = []
            for (let i = 0; i < rs[0].length; i++)
                services.push(rs[0][i].service_id)
            return services
        } catch (error) {
            throw error
        }
    }

    async rooms_in_service(id) {
        try{
            const statement = `SELECT service.id, service.name, service.cost, service.unit, service.house_id, service.description,
            COALESCE(
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', room.id, 'name', room.name, 'cost', room.cost, 'max_user', room.max_user, 'status', room.status, 'description', room.description)
                ),
                JSON_ARRAY()
            ) AS rooms
            FROM service
            LEFT JOIN service_room ON service.id = service_room.service_id
            LEFT JOIN room ON room.id = service_room.room_id
            WHERE service.id = ?`;
            const rs = await db.query(statement, [id])
            return rs[0][0]
        } catch (error) {
            throw error
        }
    }

    async add_service_to_room(data) {
        try {
            console.log(data)
            const statement = `insert into service_room (room_id, service_id) values (?,?);`
            for (let x of data.id_services) {
                await db.query(statement, [data.room_id, x])
            }
            return await this.services_in_room(data.room_id);
        }catch (error) {
            throw error
        }
    }

    async remove_service_in_room (data) { //xóa hết service trong room 
        try {
            const statement = `delete from service_room where room_id = ?;`

            return await db.query(statement, [data]);
        }catch (error) {
            throw error
        }
    }
}

export default new Service()