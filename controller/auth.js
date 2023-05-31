import bcrypt from 'bcrypt'
import ownerService from '../services/ownerService'
import { SignToken, comparePassowrd } from '../utils'

export const signUp = async (req,res,next) =>{
    try {
        const {name, password, phone, birthday, address, email} = req.body
        const isExist = await ownerService.find(phone)
        if(isExist) return res.status(400).json({msg: "User already exist", status: false})
        const hashPassword = await bcrypt.hash(password,8)
        const newOwner = await ownerService.createOwner({name,password: hashPassword,phone,birthday,address,email})
        const accessToken = SignToken(newOwner.id)
        res.status(200).json({msg:"Register success", status: true, data: {newOwner, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const signIn = async (req,res,next) => {
    try {
        const {phone,password} = req.body
        const user = await ownerService.find(phone)
        if(user === null) return res.status(400).json({msg: "User not exists", status: false})
        const isValidPassword = await comparePassowrd(password, user.password)
        if(!isValidPassword) return res.status(403).json({msg: "Wrong password", status: false})
        const accessToken = SignToken(user.id)
        res.status(200).json({msg: "Login success", status: true, data : {user, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}
