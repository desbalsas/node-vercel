import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import * as middlewares from './middlewares'
import api from './api'
import type MessageResponse from './interfaces/MessageResponse'
import path from 'node:path'

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

// Cualquier otra ruta debe servir el index.html de React
app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
