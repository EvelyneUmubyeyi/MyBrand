const Skill = require('./../models/skill')

const createSkill = async (req, res) => {
    try {
        const { category, specific_skills } = req.body
        const skill = new Skill({ category: category, specific_skills: specific_skills })
        await skill.save()
        return res.status(201).json({ status: 'success', message: 'created a skill successfully', data: skill })
    }   
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 })
        return res.status(200).json({ status: 'success', message: "All skills", data: skills })
    }
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

const getSingleSkill = async (req, res) => {
    try {
        const skillId = req.params.id
        const skill = await Skill.findById(skillId)
        if(!skill){
            return res.status(404).json({ status: 'failed', message: "No skill with such id"})
        }
        return res.status(200).json({ status: 'success', message: "Single skill", data: skill })
    }
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

module.exports = { createSkill, getAllSkills, getSingleSkill }