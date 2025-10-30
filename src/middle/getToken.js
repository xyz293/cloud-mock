import jwt from "jsonwebtoken";
import config from '../config/index.js' 
export const getToken =(username,password)=>{
    try {
        const token = jwt.sign({username,password},config.accessSecret,{
            expiresIn: config.expires
        })
        return token
    } catch (error) {
        return null
    }
}


export const ReshToken =(username,password)=>{
  try {
        const token = jwt.sign({username,password},config.refreshSecret,{
            expiresIn: config.refreshExpires
        })
        return token
    } catch (error) {
        return null
    }
}