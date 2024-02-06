import express from 'express'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import dotenv from 'dotenv'
import { expressjwt as jwt } from 'express-jwt'
import cors from 'cors'
import type { Secret } from 'jsonwebtoken'
dotenv.config()
const app = express()
const port = 3001

app.use(express.json())

app.use(
  cors({
    origin: '*'
  })
)

app.use(
  jwt({
    secret: process.env.SECRET_KEY as Secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/refresh/token',
      '/api/auth/forgot-password',
      /^\/api\/auth\/new-password\/.*$/
    ]
  })
)

app.use('/api', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor levantado en el puerto ${port}`)
})
