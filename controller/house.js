import houseService from '../services/houseService'

export const createHouse = async (req,res,next) => {
    try {
        const {name, description, location } = req.body
        const owner_id = req.user.userId
        const createdHouse = await houseService.createHouse({name, description, location, owner_id})
        res.status(200).json({msg:"Created success", data: createdHouse, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const allHouse = async(req,res,next) => {
    try {
        const houses = await houseService.allHouses()
        res.status(200).json({msg:"All", data: houses, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const getHouse = async (req,res,next) =>{
    try {
        const id = req.params.id
        const house = await houseService.getHouse(id)
        if(!house) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Found", data: house, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const updateHouse = async(req,res,next) => {
    try {
        const {name, description, location } = req.body
        const id = req.params.id
        const updatedHouse = await houseService.updateHouse({name, description, location, id})
        if(!updatedHouse) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Updated", data: updatedHouse, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const deleteHouse = async(req,res,next) => {
    try {
        const id = req.params.id
        const deletedHouse = await houseService.deleteHouse(id)
        res.status(200).json({msg:"Deleted", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const getOwnerHouse = async(req,res,next) => {
    try {
        const house_id = req.params.id
        const houses = await houseService.getAllOwnerHouse(house_id)
        res.status(200).json({msg:"All", data: houses, status:  true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}