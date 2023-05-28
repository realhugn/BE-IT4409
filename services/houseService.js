import House from "../models/houses"

class HouseService {
     async createHouse (data) {
        try {
            const newHouse = await House.create(data)
            return newHouse
        } catch (error) {
            throw error
        }
     } 
    
    async getHouse (id) {
        try {
            const house = await House.get(id)
            return house
        } catch (error) {
            throw error
        }
    }

    async allHouses() {
        try {
            const houses = await House.all()
            return houses
        } catch (error) {
            throw error
        }
    }

    async updateHouse(data) {
        try {
            const isExist = await this.getHouse(data.id)
            if(!isExist) return null
            const updateHouse = await House.update(data)
            return updateHouse
        } catch (error) {
            throw error
        }
    }

    async deleteHouse(id) {
        try {
            const isExist = await this.getHouse(id)
            if(!isExist) 
                return null
            const deletedHouse = await House.delete(id)
            return deletedHouse
        } catch (error) {
            throw error
        }
    }

    async getAllOwnerHouse(owner_id) {
        try {
            const houses = await House.get_owner_house(owner_id)
            return houses
        } catch (error) {
            throw error
        }
    }
}

export default new HouseService()