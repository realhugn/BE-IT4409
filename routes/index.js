import express from 'express'
import authRoute from './auth'
import ownerRoute from './owner'
import houseRoute from './house'
import renterRoute from "./renter"
import roomRoute from  './room'
import serviceRoute from './service'
import covenantRoute from './covenant'
import billRoute from './bill'

const route = express.Router()
route.use('/', authRoute)
route.use('/user', ownerRoute)
route.use('/house', houseRoute)
route.use('/renter', renterRoute)
route.use('/room', roomRoute)
route.use('/service', serviceRoute)
route.use('/covenant', covenantRoute)
route.use('/bill',billRoute)
export {route}