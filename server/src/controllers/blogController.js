const Blog = require('./../models/blog')

const createBlog = async (req, res) => {
    try {
        const { title, hook, image, body, author_name, author_image } = req.body
        const blog = await new Blog({ title: title, hook: hook, image: image, body: body, author_name: author_name, author_image: author_image })
        const newBlog = await blog.save()
        console.log('I reach here')
        return res.status(201).json({
            message: "Blog created successfully",
            data: newBlog,
        })
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err.message })
    }
}

const getAllBlogs = async (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.status(200).json({ message: "All blogs", data: result })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err.message })
        })
}

const getOneBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: "No blog with such ID" })
        }
        return res.status(200).json({ message: "Single blog", data: blog })
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err.message })
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
                    res.status(500).json({ message: "Something went wrong, couldn't save", Error: err.message })
                })
        })

        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err.message })
        })

}

const deleteBlog = async (req, res) => {
    const blogId = req.params.id
    const deletedBlog = Blog.findByIdAndDelete(blogId)
        .then(result => {
            res.json({ message: "Blog deleted", data: result })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", Error: err.message })
        })

}

module.exports = {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
}