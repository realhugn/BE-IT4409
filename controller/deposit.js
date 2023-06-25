import depositService from "../services/depositService"
import renterService from '../services/renterService'
import roomService from '../services/roomService'

export const createDeposit = async (req,res,next) => {
    try {
        const {renter_id , room_id, tien_coc, status ,start_time , end_time} = req.body
        const renter = await renterService.getRenter(renter_id)
        if (renter == null) return res.status(404).json({msg: "Cant find renter", status: false})
        const room = await roomService.getRoom(room_id)
        if (room == null) return res.status(404).json({msg: "Cant find room", status: false})
        const result = await depositService.createDeposit({renter_id , room_id, tien_coc, status ,start_time , end_time})
        res.status(200).json({msg: 'Create Success', status: true, data: result})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const getDeposit = async(req,res,next) => {
    try {
        const rs = await depositService.getDeposit(req.params.id)
        if(rs == null) return res.status(404).json({msg: 'Not Found', status: false})
        res.status(200).json({msg: 'Found', status: true, data: rs})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const updateDeposit = async (req,res,next) => {
    try {
        const {tien_coc, status, start_time, end_time} = req.body
        const rs = await depositService.updateDeposit({tien_coc, status, start_time, end_time, id: req.params.id})
        if(rs == null) return res.status(404).json({msg: 'Not Found', status: false})
        res.status(200).json({msg: 'update Success', status: true, data: rs})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const deleteDespoit =async (req,res,next) => {
    try {
        const rs = await depositService.deleteDespoit( req.params.id)
        if(rs == null) return res.status(404).json({msg: 'Not Found', status: false})
        res.status(200).json({msg: 'Delete Success', status: true, data: rs})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const getHouseDeposit = async (req,res,next) => {
    try {
        const rs = await depositService.depositHouse(req.params.id)
        res.status(200).json({msg: 'Success', status: true, data: rs})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}