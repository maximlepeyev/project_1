import { Router, Request, Response } from "express"

export const postRoute = Router({})

type RequestParamType<P> = Request<P, {}, {}, {}>
type RequestBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyWithParamType<P,B> = Request<P, {}, B, {}>
type PostsType = {
        id: string
        title: string
        shortDescription: string
        content: string
        blogId: string
        blogName: string
}
type ErrorsMessages = {
    message: string,
    field: string
}
type ErrorType = {
    errorsMessages: ErrorsMessages[]
}

const posts: PostsType[] = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
      }
]

postRoute.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})
postRoute.get('/:id', (req:RequestParamType<{id: string}>, res) => {
    let postById = posts.find((post) => post.id === req.params.id )
    postById ? res.status(200).send(postById) : res.sendStatus(401)
})
postRoute.post('/', (req: RequestBodyType<{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}>, res: Response) => {

    let id = new Date ()
    let { title, shortDescription, content, blogId } = req.body

    let errors: ErrorType = {
        errorsMessages: []
    }

    if (typeof title !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'title'})
    } 
    if (typeof shortDescription !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'shortDescription'})
    }
    if (typeof content !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'content'})
    }
    if (typeof blogId !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'blogId'})
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
    }

    let newPost = {
        id: id.toISOString(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: "string"
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})
postRoute.delete('/:id', (req:RequestParamType<{id: string}>, res) => {

    for ( let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.id) {
            posts.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})
postRoute.put('/:id', (req:RequestBodyWithParamType<{id: string}, {title: string, shortDescription: string, content: string, blogId: string}>, res ) => {
    let { title, shortDescription, content, blogId } = req.body
    let updatedPost : PostsType | undefined = posts.find( (post) => post.id === req.params.id)
    if (!updatedPost) {
        res.sendStatus(404)
    }
    let errors: ErrorType = {
        errorsMessages: []
    }

    if (typeof title !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'title'})
    } 
    if (typeof shortDescription !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'shortDescription'})
    }
    if (typeof content !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'content'})
    }
    if (typeof blogId !== 'string') {
        errors.errorsMessages.push({message:'string', field: 'blogId'})
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
    }
    if (updatedPost) {
        updatedPost.title = title
        updatedPost.shortDescription = shortDescription
        updatedPost.content = content
        updatedPost.blogId = blogId
        res.sendStatus(200)
    }
})