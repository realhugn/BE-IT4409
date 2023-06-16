import renterService from '../services/renterService'
import bcrypt from 'bcrypt'
import { SignToken } from '../utils'



export const getRenter = async (req,res,next) =>{
    try {
        const id = req.params.id
        const user = await renterService.getRenter(id)
        if(user.id != req.user.userId) 
            return res.status(404).json({msg: "Fail", status: false})
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"User Found", data: user, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const updateRenter = async(req,res,next) => {
    try {
        const {phone,password, name, string, birthday, address, email, gender} = req.body
        const id = req.params.id
        const hashPassword = await bcrypt.hash(password,8)
        const updatedUser = await renterService.updateProfile({phone, password:hashPassword, name, string, birthday, address, email, gender, id})
        if(!updatedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: updatedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error", status: false})
    }
}

export const deleteRenter = async(req,res,next) => {
    try {
        const id = req.params.id
        const deletedUser = await renterService.deleteRenter(id)
        if(!deletedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Delete success", data: deletedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Delete fail", status: false})
    }
}

export const createRenter = async(req,res,next) => {
    try {
        const {phone,password,name,birthday, gender,address, email} = req.body
        const hashPassword = await bcrypt.hash(password,8)
        const newRenter = await renterService.createRenter({name,password: hashPassword,phone,birthday,address,email,gender})
        const accessToken = SignToken(newRenter.id)
        res.status(200).json({msg:"Register success", status: true, data: {newRenter, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Created Fail", status: false})
    }
}