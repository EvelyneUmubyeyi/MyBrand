const Blog = require('./../models/blog')

const createBlog = async (req, res) => {
    const { title, hook, image, body, author_name, author_image } = req.body
    const blog = new Blog({ title: title, hook: hook, image: image, body: body, author_name: author_name, author_image: author_image })
    blog.save()

        .then(result => {
            res.status(201).json({
                message: "Blog created successfully",
                data: blog,
            })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err })
        })
}

const getAllBlogs = async (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.status(200).json({ message: "All blogs", data: result })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err })
        })
}

const getOneBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await Blog.findById(blogId)
        if (!blog) {
            console.log(blog)
            return res.status(404).json({ message: "No blog with such ID" })
        } else {
            console.log(blog)
            return res.status(200).json({ message: "Single blog", data: result })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err })
    }
}

const updateBlog = async (req, res) => {
    const { title, hook, image, body, author_name, author_image } = req.body
    const blogId = req.params.id
    const blog = Blog.findById(blogId)
        .then(result => {

            if (title) {
                result.title = title
            }
            if (hook) {
                result.hook = hook
            }
            if (image) {
                result.image = image
            }
            if (body) {
                result.body = body
            }
            if (author_name) {
                result.author_name = author_name
            }
            if (author_image) {
                result.author_image = author_image
            }

            result.save()
                .then(result => {
                    res.status(200).json({ message: "blog updated successfully", data: result })
                })
                .catch(err => {
                    res.status(500).json({ message: "Something went wrong, couldn't save", Error: err })
                })
        })

        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err })
        })

}

const deleteBlog = async (req, res) => {
    const blogId = req.params.id
    const deletedBlog = Blog.findByIdAndDelete(blogId)
        .then(result => {
            res.json({ message: "Blog deleted", data: result })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err })
        })

}

module.exports = {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
}