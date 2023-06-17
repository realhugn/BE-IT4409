import Renter from "../models/renter"

class RenterService {
     async createRenter (data) {
        try {
            const newRenter = await Renter.create(data)
            return newRenter
        } catch (error) {
            throw error
        }
     } 
    
    async getRenter (id) {
        try {
            const renter = await Renter.get(id)
            return renter
        } catch (error) {
            throw error
        }
    }

    async find(phone) {
        try {
            const renter = await Renter.find(phone)
            return renter
        } catch (error) {
            throw error
        }
    }

    async updateProfile(data) {
        try {
            const isExist = await this.getRenter(data.id)
            if(!isExist) return null
            const renter = await Renter.update(data)
            return renter
        } catch (error) {
            throw error
        }
    }

    async deleteRenter(id) {
        try {
            const isExist = await this.getRenter(id)
            if(!isExist) 
                return false
            await Renter.delete(id)
            return true
        } catch (error) {
            throw error
        }
    }

    async updatePassword(data) {
        try {
            const isExist = await this.getRenter(data.id)
            if(!isExist) 
                return null
            return await Renter.update_pass(data)
        } catch (error) {
            
        }
    }
}

export default new RenterService()