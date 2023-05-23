import bcrypt from 'bcrypt'
import userService from '../services/userService'
import { SignToken, comparePassowrd } from '../utils'

export const signUp = async (req,res,next) =>{
    try {
        const {username, password, phone} = req.body
        const isExist = await userService.find(username)
        if(isExist > 0) return res.status(400).json({msg: "Username already exist", status: false})
        const hashPassword = await bcrypt.hash(password,8)
        const newUser = await userService.createUser({username,password: hashPassword,phone,status:true})
        const accessToken = SignToken(newUser.id)
        res.status(200).json({msg:"created successfully", status: true, data: {newUser, accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const signIn = async (req,res,next) => {
    try {
        const {username,password} = req.body
        const user = await userService.find(username)
        if(user === null) return res.status(400).json({msg: "Username not exists", status: false})
        const isValidPassword = await comparePassowrd(password, user.password)
        if(!isValidPassword) return res.status(403).json({msg: "Wrong password", status: false})
        const accessToken = SignToken(user.id)
        res.status(200).json({msg: "Sign In Success", status: true, data : {user, accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}
