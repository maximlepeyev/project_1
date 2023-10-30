import { Router, Request, Response } from "express"
import { videoRepository } from '../repositories/video-repositories';
import {body, validationResult} from "express-validator"
import {inputValidationMiddleware} from '../middleware/input-validation-middleware';

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

const titleValidation = body('title').trim().isLength( { min: 1, max: 40 } )
const authorValidation = body('title').trim().isLength( { min: 1, max: 20 } )
const availableResolutionsValidation = body('availableResolutions').isArray().isLength({min:1})
const canBeDownloadedValidation = body('canBeDownloaded').isBoolean()
const minAgeRestrictionValidation = body('minAgeRestriction').isInt().custom(async (value: number) => {
    value > 18
})

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

videoRoute.put('/:id',
                    titleValidation,
                    authorValidation,
                    availableResolutionsValidation,
                    canBeDownloadedValidation,
                    minAgeRestrictionValidation,
                    inputValidationMiddleware,
    (req: RequestBodyAndParams<{id: string}, {title: string, author: string, availableResolutions: AvailableResolutions[], canBeDownloaded:boolean, publicationDate: string, minAgeRestriction: number | null}>, res: Response) => {
    
    let {title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction} = req.body
   
    let videoByID = videoRepository.putVideo(+req.params.id, title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction)
    if (!videoByID) {
        res.sendStatus(404)
    } 
    res.sendStatus(204);

})

videoRoute.post('/', titleValidation,
                     authorValidation,
                     availableResolutionsValidation,
                     inputValidationMiddleware,
    (req: RequestBodyType<{title: string, author: string, availableResolutions: AvailableResolutions[]}>, res) => {

    let {title, author, availableResolutions} = req.body

    let newVideo = videoRepository.postVideo(title, author, availableResolutions)
    res.status(201).send(newVideo)

})