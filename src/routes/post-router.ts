import { Router, Request, Response } from "express"
import { postRepository } from "../repositories/post-repositories"
import { RequestBodyType, RequestParamType, RequestBodyAndParamType } from "../type/request-type"
import { basicAuthMiddleware } from '../middleware/basic-authorisation'
import {postsValidation} from '../middleware/posts-validation'
import {inputValidationMiddleware} from '../middleware/input-validation-middleware'

export const postRoute = Router({})


postRoute.get('/', (req: Request, res: Response) => {
    res.status(201).send(postRepository.getPosts())
})

postRoute.get('/:id', basicAuthMiddleware, postsValidation, inputValidationMiddleware, (req:RequestParamType<{id: string}>, res: Response) => {
    let postById = postRepository.getPostById(req.params.id)
    postById ? res.status(200).send(postById) : res.sendStatus(401)
})

postRoute.post('/', basicAuthMiddleware, postsValidation, inputValidationMiddleware, (req: RequestBodyType<{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}>, res: Response) => {

    let { title, shortDescription, content, blogId } = req.body

    let newPost = postRepository.createNewPost(title, shortDescription, content, blogId)
    res.status(201).send(newPost)
})

postRoute.delete('/:id', basicAuthMiddleware, postsValidation, inputValidationMiddleware, (req:RequestParamType<{id: string}>, res: Response) => {
    postRepository.deletePostById(req.params.id) ? res.sendStatus(204) : res.sendStatus(404) 
})

postRoute.put('/:id', basicAuthMiddleware, postsValidation, inputValidationMiddleware, (req:RequestBodyAndParamType<{id: string}, {title: string, shortDescription: string, content: string, blogId: string}>, res: Response ) => {
    let { title, shortDescription, content, blogId } = req.body
    let updatedPost = postRepository.putUpdatePost(req.params.id, title, shortDescription, content, blogId)

    updatedPost ? res.sendStatus(204) : res.sendStatus(401)  
})