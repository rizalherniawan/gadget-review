import { Request, Response } from "express"

export const validation = (scheme : any) => {
    return async(req : Request, res : Response, next : any) => {
        try {
            await scheme.validateAsync(req.body)
            next()
        } catch (error : any) {
            res.status(400).json({message: error.details[0].message})
        }
    }
}
