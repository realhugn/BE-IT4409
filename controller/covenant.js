import covenantService from '../services/covenant'
import renterService from '../services/renterService'
import roomService from '../services/roomService'
import houseService from '../services/houseService'
import ownerService from '../services/ownerService'

export const createCovenant = async (req,res,next) => {
    try {
        const {room_id, renter_id, duration,pay_time,pre_pay, note, started_date, end_date} = req.body
        const isRenterExist =  await renterService.getRenter(renter_id)
        if (!isRenterExist) return res.status(400).json({msg: "Renter not exists", status : false})
        const isExist =( await covenantService.covenantRenter(renter_id)) && (await covenantService.get)
        if (isExist) return res.status(400).json({msg: "Covenant with this renter already exist", status : false})
        const room = await roomService.getRoom(room_id)
        const house = await houseService.getHouse(room.house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        const createdCovenant = await covenantService.createCovenant({room_id, renter_id, duration,pay_time,pre_pay, note, started_date, end_date})
        res.status(200).json({msg:"Created success", data: createdCovenant, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const updateCovenant = async (req, res, next) => {
    try {
        const {duration,pay_time,pre_pay, note, started_date, end_date} = req.body
        const id = req.params.id

        const updateCovenant = await covenantService.updateCovenant({duration,pay_time,pre_pay, note, started_date, end_date, id})
        
        res.status(200).json({
            msg:"Update success", 
            data: updateCovenant, 
            status: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error, status: false})
    }
}

export const getCovenant = async (req,res,next) =>{
    try {
        const id = req.params.id
        const covenant = await covenantService.getCovenant(id)
        const room = await roomService.getRoom(covenant.room_id)
        const house = await houseService.getHouse(room.house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        if(!covenant) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Found", data: covenant, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const deleteCovenant = async(req,res,next) => {
    try {
        const id = req.params.id
        const covenant = await covenantService.getCovenant(id)
        const room = await roomService.getRoom(covenant.room_id)
        const house = await houseService.getHouse(room.house_id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        await covenantService.deleteCovenant(id)
        res.status(200).json({msg:"Deleted", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const covenantRenter = async (req,res,next) => {
    try {
        const id = req.user.userId
        const covenant = await covenantService.covenantRenter(id)
        res.status(200).json({msg:"Found", data:covenant, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const covenantHouse = async (req,res,next) => {
    try {
        const id = req.params.id
        const house = await houseService.getHouse(id)
        const isBelong = house.owner_id == req.user.userId
        if (!isBelong) 
            return res.status(404).json({msg: "Fail", status: false})
        const covenants = await covenantService.covenantHouse(id)
        res.status(200).json({msg:"All", data:covenants, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}
export const inforCovenant = async (req,res,next) => {
    try {
        console.log("aaa ",req.user.userId)
        const user = await renterService.getRenter(req.user.userId)
        console.log(user)
        const covenant = await covenantService.covenantRenter(req.user.userId)
        const room = await roomService.getRoom(covenant.room_id)
        const house = await houseService.getHouse(room.house_id)
        const owner = await ownerService.getOwner(house.owner_id)
        console.log(owner)
        const body = {
            'user': user,
            'covenant': covenant,
            'room': room,
            'house': house,
            'owner': {
                'name': owner.name,
                'email': owner.email,
                'phone': owner.phone
            }
        }
        res.status(200).json({msg:"All", data:body, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }

}