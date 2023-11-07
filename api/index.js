import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/UserRoutes.js'
import authRouter from './routes/authRoutes.js'
dotenv.config();

const app = express()

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({ extended:false }))


app.listen(3000, () => {
    console.log('server is running on port 3000!')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)