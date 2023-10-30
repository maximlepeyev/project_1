import { Router, Request, Response } from "express"
import {blogsRepository} from '../repositories/blog-repositories'


export const blogRoute = Router({})

type RequestParamType<P> = Request<P, {}, {}, {}>
type RequestBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyAndParamType<P, B> = Request<P, {}, B, {}>

type ErrorsMessages = {
    message: string,
    field: string
}
type ErrorType = {
    errorsMessages: ErrorsMessages[]
}
type BlogsType = {
        id: string,
        name: string,
        description: string,
        websiteUrl: string
}


blogRoute.post('/', (req: RequestBodyType<{name: string, description: string, websiteUrl: string}>, res: Response) => {

    let { name, description, websiteUrl } = req.body
    let errors: ErrorType = {
        errorsMessages: []
    }
    if (typeof name !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'name'})
    }
    if (typeof description !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'description'})
    }
    if (typeof websiteUrl !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'websiteUrl'})
    }
    if( errors.errorsMessages.length > 0) {
        res.status(404).send(errors)
    }
    let newBlog = blogsRepository.postBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})
blogRoute.get('/', (req: Request, res:Response) => {
    res.status(201).send(blogsRepository.getBlogs)
})
blogRoute.get('/:id', (req:RequestParamType<{id: string}>, res:Response) => {
    let blogById = blogsRepository.getBlogById(req.params.id)
    blogById ? res.status(201).send(blogById) : res.sendStatus(404)
})
blogRoute.delete('/:id', (req: RequestParamType<{id: string}>, res: Response) => {
    blogsRepository.deleteBlogByID(req.params.id) ? res.sendStatus(200) : res.sendStatus(400) 
})
blogRoute.put('/', (req: RequestBodyAndParamType<{id:string}, {name: string, description: string, websiteUrl: string}>, res: Response) => {
    let { name, description, websiteUrl } = req.body
    let errors: ErrorType = {
        errorsMessages: []
    }

    blogsRepository.putBlog(req.params.id, name, description, websiteUrl) ? res.sendStatus(200) : res.sendStatus(404)
    if (typeof name !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'name'})
    }
    if (typeof description !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'description'})
    }
    if (typeof websiteUrl !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'websiteUrl'})
    }
    if( errors.errorsMessages.length > 0) {
        res.status(400).send(errors)
    }

})
