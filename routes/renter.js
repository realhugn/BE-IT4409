import express from 'express'
import { verifyTokenUser,isAuth, isOwner } from '../middlewares/auth'
import { createRenter, deleteRenter, getRenter, renterInHouse, updateRenter } from '../controller/renter'
import { updatePassword } from '../controller/owner'

const route = express.Router()
route.post("/", verifyTokenUser, isOwner, createRenter)
route.get('/:id',verifyTokenUser,isAuth, getRenter)
route.get('/house/:id', verifyTokenUser, renterInHouse)
route.put('/:id', verifyTokenUser, updateRenter)
route.delete('/:id',verifyTokenUser,isAuth, deleteRenter)
route.put("/password/:id", verifyTokenUser,isAuth,updatePassword)

export default route