import Bill from '../models/bill'
class BillService {
    getHouseBill(house_id) {
        return Bill.getBillsByHouseId(house_id)
    }
    getBillById(id) {
        return Bill.get(id)
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
}

export default new BillService()