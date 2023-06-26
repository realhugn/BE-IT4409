import express from 'express'
import { getHouse, getOwnerHouse ,allHouse, updateHouse, deleteHouse, createHouse} from '../controller/house'
import { verifyTokenUser,isAuth, isOwner } from '../middlewares/auth'

const route = express.Router()
route.get("/", allHouse )
route.post("/",verifyTokenUser, isOwner, createHouse)
route.get('/:id', getHouse)
route.get("/owner/:id",getOwnerHouse )
route.put('/:id', verifyTokenUser, updateHouse)
route.delete('/:id',verifyTokenUser, deleteHouse)

export default route