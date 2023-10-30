import { Express, NextFunction, Request, Response } from "express"



export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization 
    if (auth === 'Basic YWRtaW46cXdlcnR5') {
        next()
    } else {
        res.sendStatus(401)
    }
}