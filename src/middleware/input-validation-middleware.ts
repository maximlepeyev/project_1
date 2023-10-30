import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";



export const inputValidationMiddleware = (req:Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
         res.send(errors.array())
    } else {
        next()
    }
}

