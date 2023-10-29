import express, {Request, Response} from 'express'
import { videoRoute } from './routes/video-router'
import { postRoute } from './routes/post-router'
import { blogRoute } from './routes/blog-router'

export const app = express()

app.use(express.json())

app.use('/videos/', videoRoute)
app.use('/posts/', postRoute)
app.use('/blogs', blogRoute)

app.get('/', (req, res) => {
    res.send('Hello')
})






