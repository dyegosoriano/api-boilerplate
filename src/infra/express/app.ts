import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express from 'express'

import errorHandling from './middlewares/errorHandling'
import { routes } from './routes'

import '@shared/container'

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandling.notFound)
app.use(errorHandling.globalErrors)

export { app }
