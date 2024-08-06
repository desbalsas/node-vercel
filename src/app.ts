import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import * as middlewares from './middlewares'
import api from './api'
import type MessageResponse from './interfaces/MessageResponse'

require('dotenv').config()

const app = express()

//app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
// Middleware para servir archivos estáticos
app.use(express.static('public'))

app.get<{}, MessageResponse>('/', (_, res) => {
	res.json({
		message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
	})
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
