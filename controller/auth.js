import bcrypt from 'bcrypt'
import ownerService from '../services/ownerService'
import { SignToken, comparePassowrd } from '../utils'
import renterService from '../services/renterService'

export const signUp = async (req,res,next) =>{
    try {
        const {name, password, phone, birthday, address, email} = req.body
        const isExist = await ownerService.find(phone)
        if(isExist) return res.status(400).json({msg: "User already exist", status: false})
        const hashPassword = await bcrypt.hash(password,8)
        const newOwner = await ownerService.createOwner({name,password: hashPassword,phone,birthday,address,email})
        const accessToken = SignToken(newOwner.id, 'owner')
        res.status(200).json({msg:"Register success", status: true, data: {newOwner, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Create account fail", status: false})
    }
}

export const signIn = async (req,res,next) => {
    try {
        const {phone,password} = req.body
        const isExist = (await ownerService.find(phone)) || (await renterService.find(phone))
        if(isExist == null) return res.status(400).json({msg: "User not exists", status: false})
        const user = await renterService.find(phone) || await ownerService.find(phone)
        const isValidPassword = await comparePassowrd(password, user.password)
        if(!isValidPassword) return res.status(403).json({msg: "Wrong password", status: false})
        const accessToken = SignToken(user.id, user.role)
        res.status(200).json({msg: "Login success", status: true, data : {user, token: accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Sign in Fail", status: false})
    }
}
