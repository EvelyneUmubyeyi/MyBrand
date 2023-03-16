const Blog = require('./../models/blog')
const User = require('./../models/user')

const likeAndUnlikeBlog = async (req, res) => {
    try {
        const blogId = req.baseUrl.split("/")[2]
        const userId = req.body.id


        const blog = await Blog.findById(blogId)
        const user = await User.findById(userId)

        if (!blog) {
            return res.status(404).json({ message: "No blog with such ID" })
        } else if (!user) {
            return res.status(404).json({ message: "No user with such ID" })
        }

        if (blog.like_emails.includes(user.email)) {
            blog.likes -= 1
            let index = blog.like_emails.indexOf(user.email)
            if (index > -1) {
                blog.like_emails.splice(index, 1)
            }
            await blog.save()
                .catch(err => {
                    return res.status(500).json({ message: "server error", Error: err.message })
                })

            return res.status(200).json({ message: "blog unliked successfully", data: blog })
        } else {
            blog.likes += 1
            blog.like_emails.push(user.email)
            await blog.save()
                .catch(err => {
                    return res.status(500).json({ message: "server error", Error: err.message })
                })

            return res.status(200).json({ message: "blog liked successfully", data: blog })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err.message })
    }

}

const getAllLikes = async (req, res) => {
    try {
        const blogId = req.baseUrl.split("/")[2]

        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.status(404).json({ message: "No blog with such ID" })
        }

        return res.status(200).json({ message: "All likes on the blog", length: blog.likes, data: blog.like_emails })

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err.message })
    }
}

module.exports = { likeAndUnlikeBlog, getAllLikes }