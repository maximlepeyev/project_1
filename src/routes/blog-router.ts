import { Router, Request, Response } from "express"
import {blogsRepository} from '../repositories/blog-repositories'
import {basicAuthMiddleware} from '../middleware/basic-authorisation'
import { RequestBodyType, RequestParamType, RequestBodyAndParamType } from "../type/request-type"
import {blogsValidation} from '../middleware/blogs-validation'
import {inputValidationMiddleware} from '../middleware/input-validation-middleware'

export const blogRoute = Router({})


blogRoute.post('/',
                basicAuthMiddleware,
                blogsValidation,
                inputValidationMiddleware,
                (req: RequestBodyType<{name: string, description: string, websiteUrl: string}>, res: Response) => {
    let { name, description, websiteUrl } = req.body
    let newBlog = blogsRepository.postBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})

blogRoute.get('/', (req: Request, res:Response) => {
                res.status(201).send(blogsRepository.getBlogs())
})

blogRoute.get('/:id', (req:RequestParamType<{id: string}>, res:Response) => {
    let blogById = blogsRepository.getBlogById(req.params.id)
    res.status(201).send(blogById)
})

blogRoute.delete('/:id',
                        basicAuthMiddleware,
                        blogsValidation,
                        inputValidationMiddleware,
                        (req: RequestParamType<{id: string}>, res: Response) => {
    blogsRepository.deleteBlogByID(req.params.id) ? res.sendStatus(200) : res.sendStatus(400) 
})

blogRoute.put('/',
                 basicAuthMiddleware,
                 blogsValidation,
                 inputValidationMiddleware,
                (req: RequestBodyAndParamType<{id:string}, {name: string, description: string, websiteUrl: string}>, res: Response) => {
    let { name, description, websiteUrl } = req.body
    let updatedBlog = blogsRepository.putBlog(req.params.id, name, description, websiteUrl)
    updatedBlog ? res.sendStatus(200) : res.sendStatus(404) 
})
