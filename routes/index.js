import express from 'express'
import authRoute from './auth'


const route = express.Router()
route.use('/auth', authRoute)

export {route}