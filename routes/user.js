import express from 'express'
import { getUser, updateUser ,deleteUser} from '../controller/user'

const route = express.Router()
route.get('/:id', getUser)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)

export default route