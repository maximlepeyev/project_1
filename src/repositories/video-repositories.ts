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

export const videoRepository = {
    getVideo() {
        return videoDescription
    },
    getVideoById(id:number) {
        let videoById = videoDescription.find( (video: VideoType) => video.id === id )
        return videoById
    },
    postVideo(title: string, author: string, availableResolutions: AvailableResolutions[] ) {
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
    return newVideo
    },
    deleteById(id: number) {
        for ( let i = 0; i < videoDescription.length; i++ ) {
            if (videoDescription[i].id === id) {
                videoDescription.splice(i, 1)
                return true
            } 
        }
        return false
    },
    putVideo(id: number, title: string,
        author: string,
        availableResolutions: AvailableResolutions[],
        canBeDownloaded:boolean,
        publicationDate: string,
        minAgeRestriction: number | null) {
            let videoByID : VideoType | undefined  = videoDescription.find( (video) => video.id === id )
            if (videoByID) {
                videoByID.author = author
                videoByID.title = title
                videoByID.availableResolutions =  availableResolutions
                videoByID.canBeDownloaded = canBeDownloaded ? canBeDownloaded : false
                videoByID.minAgeRestriction = minAgeRestriction ? minAgeRestriction : null
                videoByID.publicationDate = publicationDate ? publicationDate : videoByID.publicationDate
              }
              return videoByID
        }
}