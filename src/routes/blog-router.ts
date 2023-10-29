import { Router, Request, Response } from "express"
import { send } from "process"

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

const blogs: BlogsType[] = [
    {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string"
    }
]

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
    let newBlog = {
        id: 'string',
        name: name,
        description: description,
        websiteUrl: websiteUrl
    }
    blogs.push(newBlog)
    res.status(201).send(newBlog)
})
blogRoute.get('/', (req: Request, res:Response) => {
    res.status(201).send(blogs)
})
blogRoute.get('/:id', (req:RequestParamType<{id: string}>, res:Response) => {
    let blogById = blogs.find( (blog) => blog.id === req.params.id)
    blogById ? res.status(201).send(blogById) : res.sendStatus(404)
})
blogRoute.delete('/:id', (req: RequestParamType<{id: string}>, res: Response) => {
    for ( let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === req.params.id) {
            blogs.splice(i, 1)
            res.sendStatus(201)
            return
        }

    }
    res.sendStatus(404)
})
blogRoute.put('/', (req: RequestBodyAndParamType<{id:string}, {name: string, description: string, websiteUrl: string}>, res: Response) => {
    let { name, description, websiteUrl } = req.body
    let errors: ErrorType = {
        errorsMessages: []
    }

    let blogUpdated = blogs.find( (blog) => blog.id === req.params.id)

    if (!blogUpdated) {
        res.sendStatus(404)
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
        res.status(400).send(errors)
    }

    if (blogUpdated) {
        blogUpdated.name = name
        blogUpdated.description = description
        blogUpdated.websiteUrl =  websiteUrl
        res.status(204)
    }

})
