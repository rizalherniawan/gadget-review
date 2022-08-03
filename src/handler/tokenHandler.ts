import { default as jwt } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (payload : object) => {
    return jwt.sign(payload, String(process.env.SECRET_KEY), {expiresIn: process.env.TOKEN_EXP})
}

export const verifyToken = (token : any) => {
    return jwt.verify(token, String(process.env.SECRET_KEY), function(err : any,decoded : any) {
        if(err) return null
        return decoded
    })
}

