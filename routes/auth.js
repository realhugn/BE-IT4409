import express from 'express'
import { signUp } from '../controller/auth'

const route = express.Router()
route.post('/sign-up', signUp)


export default route