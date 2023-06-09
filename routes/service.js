import express from 'express'
import { verifyTokenUser, isOwner } from '../middlewares/auth'
import { addServiceToRoom, allServices, createService, deleteService, getService, removeServiceInRoom, roomsInService, servicesInRoom, updateService} from '../controller/service'

const route = express.Router()

route.get("/house/:id",verifyTokenUser,isOwner, allServices)

route.get("/room/:id",verifyTokenUser, isOwner,  servicesInRoom )
route.post('/room/:id', verifyTokenUser,isOwner, addServiceToRoom)
route.delete("/room/:id", verifyTokenUser, isOwner, removeServiceInRoom)

route.post("/",verifyTokenUser, isOwner, createService)
route.get('/:id',verifyTokenUser, isOwner, getService)
route.put('/:id',verifyTokenUser, isOwner, updateService)
route.delete('/:id',verifyTokenUser, isOwner, deleteService)

route.get("/:id/room", verifyTokenUser, isOwner, roomsInService)

export default route