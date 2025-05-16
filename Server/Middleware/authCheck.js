import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.SECRET
import { User } from '../Model/model.js'

export default authCheck = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        const {id} = jwt.verify(token, secret) 
        const user = await User.findById(id);
        if (user.role !== "admin"){
            return res.redirect('/')
        }
        next()
    }
    catch(err){
        console.log(err)
        return res.redirect('/')
    }
}