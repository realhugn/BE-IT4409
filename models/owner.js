import {db} from '../configs/db.js'

class Owner {
    async create(data) {
        try {
            const values = [data.name, data.password, data.phone, data.birthday, data.address, data.email, data.gender]
            const statement = `insert into owner (name, password, phone, birthday, address ,email, gender, role) values (?,?,?,DATE(?),?,?,?, "owner");`
            await db.query(statement, values)
            const rs =await this.find(data.phone)
            return rs
        } catch (error) {
            throw error
        }
    }

    async get(id) {
        try {
            const values = [id]
            const statement = `select * from owner where id = ?;`
            const rs = await db.query(statement, values)
            if(rs[0].length > 0) {
                if (rs[0][0]['birthday']) 
                    rs[0][0]['birthday'] = new Date(rs[0][0].birthday).toLocaleDateString("sv-SE")
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error 
        }
    }

    async find(phone) {
        try {
            const values = [phone]
            const statement = `select * from owner where phone = ?;`
            const rs = await db.query(statement, values)
            if(rs[0].length > 0) {
                if (rs[0][0]['birthday']) 
                    rs[0][0]['birthday'] = new Date(rs[0][0].birthday).toLocaleDateString("sv-SE")
                return rs[0][0]
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }

    async updateProfile(data) {
        try {
            const values = [ data.phone, data.name, data.birthday,data.address,data.email, data.gender, data.id]
            console.log(data.gender)
            const statement = `update owner set phone = ?,name = ?, birthday =DATE(?), address=?,email =?, gender=? ,updated_at = now() where id = ?;`
            await db.query(statement, values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE  FROM owner where id = ? ;` 
            const rs = await db.query(statement,[id])
            return rs
        } catch (error) {
            throw new Error(error);
        }
    }

    async makeOwner(id) {
        try {
            const values = [id ]
            const statement = `update owner set role = "owner" ,updated_at = now() where id = ?;`
            await db.query(statement, values)
            return await this.get(id)
        } catch (error) {
            
        }
    }

    async update_pass(data) {
        try {
            const values = [ data.password, data.id]
            const statement = `update owner set password = ?, updated_at = now() where id = ?;`
            await db.query(statement, values)
            return await this.get(data.id)
        } catch (error) {
            throw error
        }
    }

}

export default new Owner()