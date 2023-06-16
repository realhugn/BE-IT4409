import ownerService from '../services/ownerService'
import bcrypt from 'bcrypt'

export const getOwner = async (req,res,next) =>{
    try {
        const id = req.params.id
        const user = await ownerService.getOwner(id)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        if(id != req.user.userId) 
            return res.status(404).json({msg: "Fail", status: false})
        res.status(200).json({msg:"User Found", data: user, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const updateOwner = async(req,res,next) => {
    try {
        const {phone,password, name, string, birthday, address, email} = req.body
        const id = req.params.id
        if(id != req.user.userId) 
            return res.status(404).json({msg: "Fail", status: false})
        const hashPassword = await bcrypt.hash(password,8)
        const updatedUser = await ownerService.updateProfile({phone, password:hashPassword, name, string, birthday, address, email,id})
        if(!updatedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: updatedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const deleteOwner = async(req,res,next) => {
    try {
        const id = req.params.id
        console.log(req.user.userId, id)
        if(id != req.user.userId) 
            return res.status(404).json({msg: "Fail", status: false})
        const deletedUser = await ownerService.deleteOwner(id)
        if(!deletedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Delete success", data: deletedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Delete fail", status: false})
    }
}

export const makeOwner = async (req,res, next) => {
    try {
        const id = req.user.userId
        const user = await ownerService.makeOwner(id)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: user, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}