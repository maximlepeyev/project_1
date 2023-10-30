import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult, body } from "express-validator";
import {blogs} from '../repositories/blog-repositories'

 export const postsValidation = [
    body('title').isString().withMessage('invalid title').trim().isLength({min:1, max: 30}).withMessage('invalid length'),
    body('shortDescription').isString().withMessage('invalid shortDescription').trim().isLength({min: 1, max: 100}).withMessage('invalid length'),
    body('content').isString().withMessage('invalid content').trim().isLength({min: 1, max: 1000}).withMessage('invalid length'),
    body('blogId').isString().withMessage('invalid blogId')
]   