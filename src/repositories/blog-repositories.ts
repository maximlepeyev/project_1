
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


export const blogsRepository = {
    getBlogs() {
        return blogs
    },

    getBlogById(id: string) {
        let blogById = blogs.find( (blog) => blog.id === id)
        return blogById
    },

    postBlog(name: string, description: string, websiteUrl: string) {
        let newBlog = {
            id: 'string',
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },

    putBlog(id: string, name: string, description: string, websiteUrl: string) {
        let blogUpdated = blogs.find( (blog) => blog.id === id)
        if (blogUpdated) {
            blogUpdated.name = name,
            blogUpdated.description = description,
            blogUpdated.websiteUrl = websiteUrl
            return true
        } else {
            return false 
        }
    },

    deleteBlogByID(id: string) {
        for ( let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
                }
}
    return false}
    

}
    