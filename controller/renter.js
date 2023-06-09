import renterService from '../services/renterService'
import bcrypt from 'bcrypt'
import { SignToken } from '../utils'
import houseService from '../services/houseService'



export const getRenter = async (req,res,next) =>{
    try {
        const id = req.params.id
        const user = await renterService.getRenter(id)
        if(user.id != req.user.userId ) 
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
        const {phone, name, string, birthday, address, email, gender} = req.body
        const id = req.params.id
        // if(req.user.role != 'user') 
        //     return res.status(404).json({msg: "Fail", status: false})
        const updatedUser = await renterService.updateProfile({phone, name, string, birthday, address, email, gender, id})
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
        const {phone,name,birthday, gender,address, email} = req.body
        const hashPassword = await bcrypt.hash("12345678", 8) //Để mật khẩu mặc định cho renter
        
        const newRenter = await renterService.createRenter({name,password: hashPassword,phone,birthday,address,email,gender})
        const accessToken = SignToken(newRenter.id)
        res.status(200).json({msg:"Register success", status: true, data: {newRenter, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message, status: false})
    }
}

export const updatePassword = async (req,res, next) => {
    try {
        const {newPassword, oldPassword} = req.body
        const id = req.params.id
        if(id != req.user.userId || req.user.role != 'renter') 
            return res.status(404).json({msg: "Fail", status: false})
        const user = await renterService.getRenter(id)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        const isValidPassword = await comparePassowrd(oldPassword, user.password);
        if(!isValidPassword) return res.status(403).json({msg: "Wrong old password", status: false})
        const hashPassword = await bcrypt.hash(newPassword,8)
        await renterService.updatePassword({id, password: hashPassword})
        res.status(200).json({msg:"Updated Password", status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const renterInHouse = async(req,res,next) => {
    try {
        const owner_id = req.user.userId
        const house_id = req.params.id
        const house = await houseService.getHouse(house_id)
        if(owner_id != house.owner_id) return res.status(300).json({msg: "Unauthorized", status : false})
        const renterRoom = await renterService.renterInHouse(house_id);
        res.status(200).json({msg:"all renter in house" , status:true, data: renterRoom})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}