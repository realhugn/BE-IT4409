import express from 'express'
import { verifyTokenUser, isOwner } from '../middlewares/auth'
import { allRooms, createRoom, deleteRoom, getRoom, updateRoom } from '../controller/room'

const route = express.Router()
route.get("/house/:id", allRooms )
route.post("/",verifyTokenUser, isOwner, createRoom)
route.get('/:id',verifyTokenUser, isOwner, getRoom)
route.put('/:id',verifyTokenUser, isOwner, updateRoom)
route.delete('/:id',verifyTokenUser, isOwner, deleteRoom)

export default route