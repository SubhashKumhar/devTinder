import express from 'express'
import connectDB from "./config/database.js"

import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)


connectDB().then(() => {
  console.log('Database connection successful')
  app.listen(3000, () => {
    console.log('api server running on port no: 3000')
  })
}).catch(() => {
  console.log('Database connection failed')
})
