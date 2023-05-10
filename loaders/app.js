import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { route } from '../routes'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: "5mb" }))
app.use(morgan("tiny"))
app.use('/api/v1',route )

export {app}