import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import covenant from '../services/covenant'

export const SignToken = (id,role) => {
    return jwt.sign({
        userId : id,
        role
    },process.env.JWT_SECRET,{expiresIn : '30d'})
} 

export const comparePassowrd = async (password1, password2) => {
    try {
        const isTrue = await bcrypt.compare(password1,password2)
        console.log(isTrue)
        return isTrue
    } catch (error) {
        
    }
}

export const checkRenterInRoom = async (room_id, renter_id) => {
    try {
        const covenant1 = await covenant.covenantRenter(renter_id)
        if(room_id == covenant1.room_id) 
            return true
        else 
            return false
    } catch (error) {
        
    }
}