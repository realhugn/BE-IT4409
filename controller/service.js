import serviceService from '../services/serviceService'

export const createService = async (req,res,next) => {
    try {
        const {name, cost, unit,description } = req.body
        const createdHouse = await serviceService.createService({name, cost, unit,description})
        res.status(200).json({msg:"Created success", data: createdHouse, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const allServices= async(req,res,next) => {
    try {
        const id = req.params.id
        const services = await serviceService.allServices(id)
        res.status(200).json({msg:"All", data: services, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const getService = async (req,res,next) =>{
    try {
        const id = req.params.id
        const service = await serviceService.getService(id)
        if(!service) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Found", data: service, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const updateService = async(req,res,next) => {
    try {
        const {name, cost, unit,description }= req.body
        const id = req.params.id
        const updatedService = await serviceService.updateService({name, cost, unit,description,id})
        if(!updatedService) return res.status(404).json({msg: "Not Found", status: false})
        res.status(200).json({msg:"Updated", data: updatedService, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const deleteService = async(req,res,next) => {
    try {
        const id = req.params.id
        await serviceService.deleteService(id)
        res.status(200).json({msg:"Deleted", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const servicesInRoom = async (req,res,next) => {
    try {
        const id = req.params.id
        const services = await serviceService.servicesInRoom(id)
        res.status(200).json({msg:"All", data:services, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const addServiceToRoom = async (req,res,next) => {
    try {
        const room_id = req.params.id
        const {id_services} = req.body
        const existedServices = await serviceService.servicesInRoom(room_id)
        for(let x of existedServices) {
            if(id_services.includes(x.id)) {
                return res.status(500).json({msg: `Service ${x.id} Exist`, status: false}) 
            }
        }
        const services = await serviceService.addServiceToRoom({room_id, id_services})
        res.status(201).json({msg:"All", data:services, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}
 
export const removeServiceInRoom = async (req, res, next) => {
    try {
        const room_id = req.params.id
        const {service_id} = req.body
        await serviceService.removeServiceInRoom({room_id, service_id})
        res.status(201).json({msg:"Removed", status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}