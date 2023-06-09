import covenantService from '../services/covenant'
import renterService from '../services/renterService'

export const createCovenant = async (req,res,next) => {
    try {
        const {room_id, renter_id, duration,pay_time,pre_pay, note, started_date, end_date} = req.body
        const isRenterExist =  await renterService.getRenter(renter_id)
        if (!isRenterExist) return res.status(400).json({msg: "Renter not exists", status : false})
        const isExist = await covenantService.covenantRenter(renter_id)
        if (isExist) return res.status(400).json({msg: "Covenant with this renter already exist", status : false})
        const createdCovenant = await covenantService.createCovenant({room_id, renter_id, duration,pay_time,pre_pay, note, started_date, end_date})
        res.status(200).json({msg:"Created success", data: createdCovenant, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const getCovenant = async (req,res,next) =>{
    try {
        const id = req.params.id
        const covenant = await covenantService.getCovenant(id)
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
        const covenants = await covenantService.covenantHouse(id)
        res.status(200).json({msg:"All", data:covenants, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}
