import express from 'express'
import { verifyTokenUser, isOwner, isAuth } from '../middlewares/auth'
import { covenantHouse, covenantRenter, createCovenant, deleteCovenant, getCovenant, inforCovenant, updateCovenant} from '../controller/covenant'

const route = express.Router()
route.get("/renter/",verifyTokenUser,  covenantRenter )
route.post("/",verifyTokenUser, isOwner, createCovenant)
route.put("/:id",verifyTokenUser, isOwner, updateCovenant)
route.get('/:id',verifyTokenUser, isOwner, getCovenant)
route.delete('/:id',verifyTokenUser, isOwner, deleteCovenant)
route.get('/house/:id', verifyTokenUser,isOwner, covenantHouse)
route.get('/renter/:id', verifyTokenUser,isAuth, inforCovenant)

export default route