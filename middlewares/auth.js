import jwt from 'jsonwebtoken'
import userService from '../services/userService';

export const verifyTokenUser = async(req,res,next) => {
    try {
        const authHeader = req.headers?.authorization
        console.log(req.headers);
          const token = authHeader && authHeader.split(" ")[1]; 
          if (!token) {
              return res.status(403).send({message: "missing token"})
          } 
          jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
              if (error) return res.status(403).send({ message: error })
              req.user = user
              next()
          })
    } catch (error) {
        console.log(error)
    }
}

export const isAuth = async (req, res, next) => {
    try {
        let loggedInUserId = req.params.id;
        if (!loggedInUserId || !req.user.userId || loggedInUserId != req.user.userId) 
            return res.status(403).json({ msg: "You are not authenticate" });
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}

export const isOwner = async (req,res,next) => {
    try {
        let isOwner = await userService.getUser(req.user.userId)
        if (isOwner.role !== 'owner') {
            return res.status(403).json({ msg: "You are not owner" });
        }
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}