const Project = require('./../models/project')
const User = require('./../models/user')

const createProject = async (req, res) => {
    try {
        const { title, image, link } = req.body
        const project = new Project({ title: title, image: image, link:link})
        await project.save()
        return res.status(201).json({ status: 201, message: 'created a project successfully', data: project })
    }   
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 })
        return res.status(200).json({ status: 200, message: "All projects", data: projects })
    }
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

const likeAndUnlike = async (req,res)=>{
    try{
        const projectId = req.baseUrl.split("/")[2]
        const userId = req.body.id

        const project = await Project.findById(projectId)
        console.log(project)
        const user = await User.findById(userId)

        if (!project) {
            return res.status(404).json({ status: 404,message: "No project with such ID" })
        } else if (!user) {
            return res.status(404).json({ status: 404, message: "No user with such ID" })
        }

        if (project.like_emails.includes(user.email)) {
            project.likes -= 1
            let index = project.like_emails.indexOf(user.email)
            if (index > -1) {
                project.like_emails.splice(index, 1)
            }
            await project.save()
                .catch(err => {
                    return res.status(500).json({ status: 500, message: "server error", Error: err.message })
                })

            return res.status(200).json({ status: 200, message: "project unliked successfully", data: project })
        } else {
            project.likes += 1
            project.like_emails.push(user.email)
            await project.save()
                .catch(err => {
                    return res.status(500).json({ status: 500, message: "server error", Error: err.message })
                })

            return res.status(200).json({ status: 200, message: "project liked successfully", data: project })
        }
    }
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

module.exports = { createProject, getAllProjects, likeAndUnlike }