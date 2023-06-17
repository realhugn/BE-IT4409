import ownerService from '../services/ownerService'
import bcrypt from 'bcrypt'
import { comparePassowrd } from '../utils'

export const getOwner = async (req,res,next) =>{
    try {
        const id = req.params.id
        const user = await ownerService.getOwner(id)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        if(id != req.user.userId || req.user.role == 'owner') 
            return res.status(404).json({msg: "Fail", status: false})
        res.status(200).json({msg:"User Found", data: user, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const updateOwner = async(req,res,next) => {
    try {
        const {phone, name, string, birthday, address, email} = req.body
        const id = req.params.id
        if(id != req.user.userId || req.user.role != 'owner') 
            return res.status(404).json({msg: "Fail", status: false})
        const updatedUser = await ownerService.updateProfile({phone, name, string, birthday, address, email,id})
        if(updatedUser === null) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: updatedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const deleteOwner = async(req,res,next) => {
    try {
        const id = req.params.id
        if(id != req.user.userId || req.user.role != 'owner') 
            return res.status(404).json({msg: "Fail", status: false})
        const deletedUser = await ownerService.deleteOwner(id)
        if(deletedUser === null) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Delete success", data: deletedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Delete fail", status: false})
    }
}


export const updatePassword = async (req,res, next) => {
    try {
        const {newPassword, oldPassword} = req.body
        const id = req.params.id
        if(id != req.user.userId || req.user.role != 'owner') 
            return res.status(404).json({msg: "Fail", status: false})
        const user = await ownerService.getOwner(id)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        const isValidPassword = await comparePassowrd(oldPassword, user.password);
        if(!isValidPassword) return res.status(403).json({msg: "Wrong old password", status: false})
        const hashPassword = await bcrypt.hash(newPassword,8)
        await ownerService.updatePassword({id, password: hashPassword})
        res.status(200).json({msg:"Updated Password", status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}
