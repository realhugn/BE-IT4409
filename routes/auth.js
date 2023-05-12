import express from 'express'
import { signIn, signUp } from '../controller/auth'

const route = express.Router()
route.post('/sign-up', signUp)
route.post('/sign-in', signIn)


export default route