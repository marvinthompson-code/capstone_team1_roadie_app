const skills = require("express").Router();

const  {
    addSingleSkill,
    getSkills
    // getAllSkillsByName,
    // getSkillById,
    // deleteSingleSkill
} = require("../queries/skillsQueries")

skills.post("/", addSingleSkill);
skills.get("/", getSkills)

module.exports = skills;


