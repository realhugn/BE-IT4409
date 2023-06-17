import Deposit from "../models/deposit"

class DepositService {
     async createDeposit (data) {
        try {
            const newDeposit = await Deposit.create(data)
            return newDeposit
        } catch (error) {
            throw error
        }
     } 
    
    async getDeposit(id) {
        try {
            const deposit = await Deposit.get(id)
            return deposit
        } catch (error) { 
            throw error
        }
    }

    async deleteDespoit(id) {
        try {
            const isExist = await this.getDeposit(id)
            if(!isExist) 
                return null
            const rs = await Deposit.delete(id)
            return rs
        } catch (error) {
            throw error
        }
    }

    async updateDeposit(data) {
        try {
            console.log(data.id)
            const isExist = await this.getDeposit(data.id)
            if(!isExist) 
                return null
            const rs = await Deposit.update(data)
            return rs
        } catch (error) {
            throw error
        }
    }
    
    async depositHouse(id) {
        try {
            const deposits = await Deposit.getDepositHouse(id)
            return deposits
        } catch (error) {
            throw error
        }
    } 
}

export default new DepositService()