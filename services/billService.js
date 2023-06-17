import Bill from '../models/bill'
class BillService {
    async getHouseBill(house_id) {
        return await Bill.getBillsByHouseId(house_id)
    }
    async getBillById(id) {
        return  await Bill.get(id)
    }

    async updateBill(id, data) {
        const isExist = await Bill.get(id)
        if (!isExist) {
            throw new Error("not found")
        }

        return Bill.update(id, data)
    }
    async deleteBill(id) {
        const isExist = await Bill.get(id)
        if (!isExist) {
            throw new Error("not found")
        }
        return Bill.delete(id)
    }
    async createBill(data) {
        return Bill.create(data)
    }
    async getBillByRenter(renter_id) {
        return Bill.getBillByRenter(renter_id)
    }
}

export default new BillService()