import express, {Request, Response} from 'express'

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

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
const videoDescription: VideoType[] = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-10-16T15:02:10.185Z",
        "publicationDate": "2023-10-16T15:02:10.185Z",
        "availableResolutions": 
            [AvailableResolutions.P144]
  
    }
]


app.post('/videos/', (req: RequestBodyType<{title: string, author: string, availableResolutions: AvailableResolutions[]}>, res) => {
    
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

    const createDate = new Date()
    const publicatinDate = new Date()
    publicatinDate.setDate(createDate.getDate() + 1)

    const newVideo: VideoType = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createDate.toISOString(),
        publicationDate: publicatinDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    videoDescription.push(newVideo)

    res.status(201).send(newVideo)

})

app.get('/videos/', (req: Request, res: Response) => {   //send all video 
    res.status(200).send(videoDescription)
})

app.get('/videos/:id', (req:RequestParams<{id:number}>, res: Response) => {   // video by ID

    let videoById = videoDescription.find( (video: VideoType) => video.id === +req.params.id )

    if (!videoById) {
        res.sendStatus(404)
    }
    res.status(200).send(videoById)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videoDescription.length = 0
    res.sendStatus(204)
})

app.delete('/videos/:id', (req:RequestParams<{id:number}>, res: Response) => {
    
    for ( let i = 0; i < videoDescription.length; i++ ) {
        if (videoDescription[i].id === +req.params.id) {
            videoDescription.splice(i, 1)
            res.sendStatus(204)
            return
        } 
       
    }
    res.sendStatus(404)
})

app.put('/videos/:id', (req: RequestBodyAndParams<{id: number}, {title: string,
    author: string,
    availableResolutions: AvailableResolutions[],
    canBeDownloaded:boolean,
    publicationDate: string,
    minAgeRestriction: number | null}>, res: Response) => {
    
    let errors: ErrorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction} = req.body
   

    let videoByID : VideoType | undefined  = videoDescription.find( (video) => video.id === +req.params.id )

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

  if (videoByID) {
    videoByID.author = author
    videoByID.title = title
    videoByID.availableResolutions =  availableResolutions
    videoByID.canBeDownloaded = canBeDownloaded ? canBeDownloaded : false
    videoByID.minAgeRestriction = minAgeRestriction ? minAgeRestriction : null
    videoByID.publicationDate = publicationDate ? publicationDate : videoByID.publicationDate
  }
    
    res.sendStatus(204);
})