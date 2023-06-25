import houseService from '../services/houseService'
import roomService from '../services/roomService'
import renterService from '../services/renterService'
import covenantService from '../services/covenant'
import { checkRenterInRoom } from '../utils'

export const createRoom = async (req,res,next) => {
    try {
        const {name, house_id,max_user, description,status, cost } = req.body
        const house = await houseService.getHouse(house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        const createdRoom = await roomService.createRoom({name, house_id,max_user, description,status, cost})
        res.status(200).json({msg:"Created success", data: createdRoom, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const allRooms= async(req,res,next) => {
    try {
        const id = req.params.id
        const rooms = await roomService.allRooms(id)
        res.status(200).json({msg:"All", data: rooms, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const getRoom = async (req,res,next) =>{
    try {
        const id = req.params.id
        const room = await roomService.getRoom(id)
        const house = await houseService.getHouse(room.house_id)
        if(req.user.role == 'owner') {
            const isBelong = house.owner_id == req.user.userId
            if (!isBelong) 
                return res.status(404).json({msg: "Fail", status: false})
        } else if (req.user.role == 'renter' && !checkRenterInRoom(id, req.user.userId)) {
            return res.status(404).json({msg: "Fail", status: false})
        }
        if(!room) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Found", data: room, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const updateRoom = async(req,res,next) => {
    try {
        const  {name, house_id,max_user, description,status, cost } = req.body
        const id = req.params.id
        const room = await roomService.getRoom(id)
        const house = await houseService.getHouse(room.house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        const updatedRoom = await roomService.updateRoom({name, house_id, max_user, description,status, cost, id})
        if(!updatedRoom) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Updated", data: updatedRoom, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const deleteRoom = async(req,res,next) => {
    try {
        const id = req.params.id
        const room = await roomService.getRoom(id)
        const house = await houseService.getHouse(room.house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        await roomService.deleteRoom(id)
        res.status(200).json({msg:"Deleted", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}
