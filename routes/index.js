import express from 'express'
import authRoute from './auth'
import ownerRoute from './owner'
import houseRoute from './house'
import renterRoute from "./renter"
import roomRoute from  './room'

const route = express.Router()
route.use('/', authRoute)
route.use('/user', ownerRoute)
route.use('/house', houseRoute)
route.use('/renter', renterRoute)
route.use('/room', roomRoute)

export {route}