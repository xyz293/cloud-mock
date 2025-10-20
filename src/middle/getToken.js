import jwt from "jsonwebtoken";
import config from '../config/index.js' 
export const getToken =(username,password)=>{
    try {
        const token = jwt.sign({username,password},config.secret,{
            expiresIn: config.expires
        })
        return token
    } catch (error) {
        return null
    }
}