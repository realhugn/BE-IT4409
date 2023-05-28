import express from 'express'
import authRoute from './auth'
import userRoute from './user'
import houseRoute from './house'

const route = express.Router()
route.use('/auth', authRoute)
route.use('/user', userRoute)
route.use('/house', houseRoute)

export {route}