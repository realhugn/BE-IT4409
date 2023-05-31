import express from 'express'
import { signIn, signUp } from '../controller/auth'

const route = express.Router()
route.post('/signUp', signUp)
route.post('/signIn', signIn)


export default route