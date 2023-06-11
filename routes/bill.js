import express from 'express'
import { deleteBill, getHouseBill, getSingleBillInfo, updateBill } from '../controller/bill'

const route = express.Router()
route.get('/house/:id', getHouseBill)
route.get('/:id', getSingleBillInfo)
route.put('/:id', updateBill)
route.delete('/:id',deleteBill)


export default route