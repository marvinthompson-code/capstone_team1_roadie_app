const skills = require("express").Router();

const  {
    addSingleSkill,
    getSkills,
    getSkillsArtistById,
    getSkillsClientById,
    getSkillById,
    deleteSingleSkill
} = require("../queries/skillsQueries")

skills.post("/", addSingleSkill); // works fine
skills.get("/", getSkills) // works fine
skills.get("/artist/:artist_id", getSkillsArtistById) // works fine
skills.get("/client/:client_id", getSkillsClientById) // works fine
skills.get("/:id", getSkillById) // works fine
skills.delete("/:id", deleteSingleSkill) // works fine

module.exports = skills;


