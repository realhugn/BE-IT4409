import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const SignToken = (id) => {
    return jwt.sign({
        userId : id
    },process.env.JWT_SECRET,{expiresIn : '1h'})
} 

export const comparePassowrd = async (password1, password2) => {
    try {
        const isTrue = await bcrypt.compare(password1,password2)
        console.log(isTrue)
        return isTrue
    } catch (error) {
        
    }
}