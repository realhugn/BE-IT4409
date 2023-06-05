import roomService from '../services/roomService'

export const createRoom = async (req,res,next) => {
    try {
        const {name, house_id,max_user, description,status, cost } = req.body
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
        await roomService.deleteRoom(id)
        res.status(200).json({msg:"Deleted", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}
