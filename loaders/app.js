import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { route } from '../routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: "5mb" }))
app.use('/api/v1',route )

export {app}