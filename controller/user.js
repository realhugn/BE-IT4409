import userService from '../services/userService'

export const getUser = async (req,res,next) =>{
    try {
        const id = req.params.id
        const user = await userService.getUser(username)
        if(!user) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"User Found", data: user, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const updateUser = async(req,res,next) => {
    try {
        const {phone} = req.body
        const id = req.params.id
        const updatedUser = await userService.updateProfile({phone, id})
        if(updatedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: updatedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}

export const deleteUser = async(req,res,next) => {
    try {
        const id = req.params.id
        const deletedUser = await userService.deleteUser(id)
        if(deletedUser) return res.status(404).json({msg: "User Not Found", status: false})
        res.status(200).json({msg:"Updated User", data: deletedUser, status: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({msg: "Server Error", status: false})
    }
}