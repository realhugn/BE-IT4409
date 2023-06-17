import express from 'express'
import { verifyTokenUser,isAuth, isOwner } from '../middlewares/auth'
import { createRenter, deleteRenter, getRenter, updateRenter } from '../controller/renter'
import { updatePassword } from '../controller/owner'

const route = express.Router()
route.post("/", verifyTokenUser, isOwner, createRenter)
route.get('/:id',verifyTokenUser,isAuth, getRenter)
route.put('/:id', verifyTokenUser, isAuth, updateRenter)
route.delete('/:id',verifyTokenUser,isAuth, deleteRenter)
route.put("/password/:id", verifyTokenUser,isAuth,updatePassword)

export default route