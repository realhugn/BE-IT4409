import Owner from "../models/owner"

class OwnerService {
     async createOwner (data) {
        try {
            const newOwner = await Owner.create(data)
            return newOwner
        } catch (error) {
            throw error
        }
     } 
    
    async getOwner (id) {
        try {
            const owner = await Owner.get(id)
            return owner
        } catch (error) {
            throw error
        }
    }

    async find(name) {
        try {
            const owner = await Owner.find(name)
            return owner
        } catch (error) {
            throw error
        }
    }

    async updateProfile(data) {
        try {
            const isExist = await this.getOwner(data.id)
            if(!isExist) return null
            const updateUser = await Owner.updateProfile(data)
            return updateUser
        } catch (error) {
            throw error
        }
    }

    async deleteOwner(id) {
        try {
            const isExist = await this.getOwner(id)
            if(!isExist) 
                return false
            await Owner.delete(id)
            return true
        } catch (error) {
            throw error
        }
    }
}

export default new OwnerService()