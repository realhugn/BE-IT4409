import User from "../models/user"

class UserService {
     async createUser (data) {
        try {
            const newUser = await User.create(data)
            return newUser
        } catch (error) {
            throw error
        }
     } 
    
    async getUser (id) {
        try {
            const user = await User.get(id)
            return user
        } catch (error) {
            throw error
        }
    }

    async find(name) {
        try {
            const user = await User.findByUname(name)
            return user
        } catch (error) {
            throw error
        }
    }

    async updateProfile(data) {
        try {
            const isExist = await this.getUser(data.id)
            if(!isExist) return null
            const updateUser = await User.update(isExist.password, data.phone, data.id)
            return updateUser
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id) {
        try {
            const isExist = await this.getUser(id)
            if(!isExist) 
                return null
            const deletedUser = await User.delete(id)
            return deletedUser
        } catch (error) {
            throw error
        }
    }

}

export default new UserService()