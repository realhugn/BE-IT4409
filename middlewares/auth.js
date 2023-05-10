

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