import express from 'express'
import {getOwner, updateOwner, deleteOwner} from '../controller/owner'
import { verifyTokenUser,isAuth } from '../middlewares/auth'

const route = express.Router()
route.get('/:id',verifyTokenUser,isAuth, getOwner)
route.put('/:id', verifyTokenUser, isAuth, updateOwner)
route.delete('/:id',verifyTokenUser,isAuth, deleteOwner)
// route.put("/owner/:id", verifyTokenUser,isAuth,makeOwner)

export default route