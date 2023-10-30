import { PostsType } from "../type/post-type"



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

export const postRepository = {
    getPosts() {
        return posts
    },
    getPostById(id: string) {
        const postsByID = posts.find( (post) => post.id === id)
        return postsByID
    },
    createNewPost(title: string, shortDescription: string, content: string, blogId: string) {

        let id = new Date ()
        let newPost = {
            id: id.toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: "string"
        }
        posts.push(newPost)
        return newPost
    },
    putUpdatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        let updatedPost = posts.find( (post) => post.id === id)

        if (updatedPost) {
            updatedPost.title = title
            updatedPost.shortDescription = shortDescription
            updatedPost.content = content
            updatedPost.blogId = blogId
            return true
        } else {
            return false
        }
    },
    deletePostById(id: string) {
        
        for ( let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
        }
    }
    return false
} 
}