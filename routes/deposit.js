import express from 'express'
import { verifyTokenUser, isOwner } from '../middlewares/auth'
import { createDeposit, deleteDespoit, getDeposit, getHouseDeposit, updateDeposit } from '../controller/deposit'

const route = express.Router()
route.get("/:id",verifyTokenUser, isOwner, getDeposit )
route.post("/",verifyTokenUser, isOwner, createDeposit)
route.put('/:id',verifyTokenUser, isOwner, updateDeposit)
route.delete('/:id',verifyTokenUser, isOwner, deleteDespoit)
route.get('/house/:id', verifyTokenUser,isOwner, getHouseDeposit)

export default route