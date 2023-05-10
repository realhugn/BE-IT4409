import bcrypt from 'bcrypt'
import userService from '../services/userService'
import jwt from 'jsonwebtoken'

export const signUp = async (req,res,next) =>{
    try {
        const {username, password, phone} = req.body
        const isExist = await userService.find(username)
        if(isExist.length > 0) return res.status(400).json({msg: "Username already exist", status: false})
        const hashPassword = await bcrypt.hash(password,8)
        const newUser = await userService.createUser({username,password: hashPassword,phone,status:true})
        const accessToken = jwt.sign({
            userId : newUser.id
        },process.env.JWT_SECRET,{expiresIn : '1h'})
        res.status(200).json({msg:"created successfully", status: true, data: {newUser, accessToken}})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}