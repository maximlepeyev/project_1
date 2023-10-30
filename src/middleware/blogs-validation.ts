import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult, body } from "express-validator";

 export const blogsValidation = [
    body('name').isString().withMessage('invalid name').trim().isLength({min: 1, max: 15}).withMessage('length should be 1-15'),
    body('description').isString().withMessage('invalid description').trim().isLength({min:1, max: 500}).withMessage('description should be 1-500'),
    body('websiteUrl').isURL().withMessage('invalid URL').isLength({min: 1, max: 100}).withMessage('lenght URL should be 1-100')
]