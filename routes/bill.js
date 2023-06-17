import express from 'express'
import { createBill, deleteBill, getBillByRenter, getHouseBill, getSingleBillInfo, updateBill } from '../controller/bill'
import { verifyTokenUser } from '../middlewares/auth'

const route = express.Router()
route.get('/house/:id',verifyTokenUser, getHouseBill)
route.get('/:id', verifyTokenUser,getSingleBillInfo)
route.put('/:id', verifyTokenUser,updateBill)
route.post('/', verifyTokenUser,createBill)
route.delete('/:id',verifyTokenUser,deleteBill)
route.get('/renter/:id', verifyTokenUser,getBillByRenter)

export default route