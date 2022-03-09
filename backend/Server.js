import express from 'express'
import cors from 'cors'
import { connection } from './config/connection.js'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser'
const app = express();
dotenv.config()

app.use(express.json({ limit: '50mb', extended: false }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}));
app.use(cookieParser())

connection()

app.use("/api", postRoutes)
app.use("/api", userRoutes)

app.use(errorMiddleware)


app.listen(process.env.PORT, (err) => {
    if (err)
        throw err;
    console.log(`Working on ${process.env.PORT}`)
})

