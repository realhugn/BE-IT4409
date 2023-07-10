import Covenant from "../models/covenant"

class CovenantService {
    async getAllCovenantActive() {
        try {
            const covenants = await Covenant.getAllActive()
            return covenants
        } catch (error) {
            throw error
        }
    }

     async createCovenant (data) {
        try {
            const newCovenant = await Covenant.create(data)
            return newCovenant
        } catch (error) {
            throw error
        }
     } 
    
    async getCovenant(id) {
        try {
            const covenant = await Covenant.get(id)
            return covenant
        } catch (error) { 
            throw error
        }
    }

    async updateCovenant(data) {
        try{
            const covenant = await Covenant.update(data)
            return covenant
        } catch (error) { 
            throw error
        }
    }

    async deleteCovenant(id) {
        try {
            const isExist = await this.getCovenant(id)
            if(!isExist) 
                return null
            const deletedCovenant = await Covenant.delete(id)
            return deletedCovenant
        } catch (error) {
            throw error
        }
    }

    async covenantRenter(id) {
        try {
            const covenant = await Covenant.covenant_renter(id)
            return covenant
        } catch (error) {
            throw error
        }
    }
    
    async covenantHouse(id) {
        try {
            const covenants = await Covenant.covenant_house(id)
            return covenants
        } catch (error) {
            throw error
        }
    } 
}

export default new CovenantService()