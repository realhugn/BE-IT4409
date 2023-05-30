import express from 'express'
import { getUser, updateUser ,deleteUser, makeOwner} from '../controller/user'
import { verifyTokenUser,isAuth } from '../middlewares/auth'

const route = express.Router()
route.get('/:id',verifyTokenUser,isAuth, getUser)
route.put('/:id', verifyTokenUser, isAuth, updateUser)
route.delete('/:id',verifyTokenUser,isAuth, deleteUser)
route.put("/owner/:id", verifyTokenUser,isAuth,makeOwner)

export default route