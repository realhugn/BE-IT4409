import express from 'express'
import authRoute from './auth'
import ownerRoute from './owner'
import houseRoute from './house'

const route = express.Router()
route.use('/', authRoute)
route.use('/user', ownerRoute)
route.use('/house', houseRoute)

export {route}