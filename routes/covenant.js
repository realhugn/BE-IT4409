import express from 'express'
import { verifyTokenUser, isOwner } from '../middlewares/auth'
import { covenantHouse, covenantRenter, createCovenant, deleteCovenant, getCovenant } from '../controller/covenant'

const route = express.Router()
route.get("/renter/",verifyTokenUser,  covenantRenter )
route.post("/",verifyTokenUser, isOwner, createCovenant)
route.get('/:id',verifyTokenUser, isOwner, getCovenant)
route.delete('/:id',verifyTokenUser, isOwner, deleteCovenant)
route.get('/house/:id', verifyTokenUser,isOwner, covenantHouse)

export default route