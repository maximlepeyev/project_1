import { Router, Request, Response } from "express"
import { videoRepository } from '../repositories/video-repositories';

export const videoRoute = Router({})

type RequestParams<P> = Request<P, {}, {}, {}>
type RequestBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyAndParams<P, B> = Request<P, {}, B, {}>

export enum AvailableResolutions {
    P144 = 'P144', 
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

export type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: AvailableResolutions[]

}
type ErrorsMessages = {
    message: string,
    field: string
}
type ErrorType = {
    errorsMessages: ErrorsMessages[]
}



videoRoute.get('/', (req: Request, res: Response) => {   //send all video 
    res.status(200).send(videoRepository.getVideo())
})

videoRoute.get('/:id', (req:RequestParams<{id:number}>, res: Response) => {   // video by ID
    let videoById = videoRepository.getVideoById(+req.params.id)
    if (!videoById) {
        res.sendStatus(404)
    }
    res.status(200).send(videoById)
})

videoRoute.delete('/testing/all-data', (req: Request, res: Response) => {
    let deleteData = videoRepository.getVideo()
    deleteData.length = 0    
    res.sendStatus(204)
})

videoRoute.delete('/:id', (req:RequestParams<{id:number}>, res: Response) => {
    
    videoRepository.deleteById(req.params.id) ? res.sendStatus(204) : res.sendStatus(404) 
})

videoRoute.put('/:id', (req: RequestBodyAndParams<{id: number}, {title: string,
    author: string,
    availableResolutions: AvailableResolutions[],
    canBeDownloaded:boolean,
    publicationDate: string,
    minAgeRestriction: number | null}>, res: Response) => {
    
    let errors: ErrorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction} = req.body
   
    let videoByID = videoRepository.putVideo(+req.params.id, title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction)
    if (!videoByID) {
        res.sendStatus(404)
    }

    if (!title || !title.length || title.trim().length > 40) {
        errors.errorsMessages.push({message:'invalid title', field: 'title'})
    }
    if (!author || !author.length || author.trim().length > 20) {
        errors.errorsMessages.push({message:'invalid author', field: 'author'})
    } 
    if (Array.isArray(availableResolutions) && availableResolutions.length) {
        availableResolutions.map( (e) => {
            !AvailableResolutions[e] && errors.errorsMessages.push({message:'invalid availableResolutions', field: 'availableResolutions'})
        })
    }
    if (canBeDownloaded === undefined || typeof canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({message:'invalid downloaded status', field: 'canBeDownloaded'})
    } 
    if (minAgeRestriction !== null) { 
    if ( minAgeRestriction > 18  || minAgeRestriction < 1 ) {
        errors.errorsMessages.push({message:'invalid minAgeRestriction', field: 'minAgeRestriction'})
     }}

     if(typeof publicationDate !== 'string') {
        errors.errorsMessages.push({message:'invalid publicationDate', field: 'publicationDate'})
     }

    if(errors.errorsMessages.length){
        res.status(400).send(errors)
        return
    }
    
    res.sendStatus(204);
})

videoRoute.post('/', (req: RequestBodyType<{title: string, author: string, availableResolutions: AvailableResolutions[]}>, res) => {
    
    let errors: ErrorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body
    if (!title || !title.length || title.trim().length > 40) {
        errors.errorsMessages.push({message:'invalid title', field: 'title'})
    }
    if (!author || !author.length || author.trim().length > 20) {
        errors.errorsMessages.push({message:'invalid author', field: 'author'})
    } 
    if (Array.isArray(availableResolutions) && availableResolutions.length) {
        availableResolutions.map( (e) => {
            !AvailableResolutions[e] && errors.errorsMessages.push({message:'invalid availableResolutions', field: 'availableResolutions'})
        })
    } 

    if(errors.errorsMessages.length){
        res.status(400).send(errors)
        return
    }

    let newVideo = videoRepository.postVideo(title, author, availableResolutions)
    res.status(201).send(newVideo)

})