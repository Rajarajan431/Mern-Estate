import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/UserRoutes.js'
import authRouter from './routes/authRoutes.js'
import listingRouter from './routes/listingRoute.js'
import cookieParser from 'cookie-parser'
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

app.use(cookieParser())


app.listen(3000, () => {
    console.log('server is running on port 3000!')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(( err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});