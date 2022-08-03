import { Response } from "express"
import { verifyToken } from "../handler/tokenHandler"


export const authentication = () => {
    return (req : any ,res : Response ,next : any) => {
        const {token} = req.headers
        if(!token) return res.status(400).json({message: "token unavailable"})
        const decoded : any = verifyToken(token)
        if(!decoded) return res.status(400).json({message: "wrong token"})
        req.data = decoded
        next()
    }
}