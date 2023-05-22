import 'dotenv/config'
import fastify from 'fastify'
import { memoriesRouter } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { AuthRouter } from './routes/auth'
import { UploadRouter } from './routes/upload'
import multipart from '@fastify/multipart'
import { resolve } from 'path'

const app = fastify()

// Plugins
app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '..', 'uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: '*',
})
app.register(jwt, {
  secret: 'supersecret',
})

// Routes
app.register(memoriesRouter)
app.register(AuthRouter)
app.register(UploadRouter)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`Server is running on port 3333`)
  })
