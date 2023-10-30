import {blogs} from '../repositories/blog-repositories'
import {posts} from '../repositories/post-repositories'

export const deleteAllData = () => {
    blogs.length = 0,
    posts.length = 0
}