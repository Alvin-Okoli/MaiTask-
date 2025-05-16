import express from 'express'
import mongoose from 'mongoose';
import router from './Routers/route.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

//enviromental variables
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT;
const mongoKey = process.env.MONGOKEY

//app setup
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE' ]
}))

mongoose.connect(mongoKey).then(res=>{
    console.log(`Connected to database`)
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res)=>{
    res.status(200).json({message: '💪🏾👨🏾‍🦲✌🏾 hello'})
})


app.use(router)