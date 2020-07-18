const db = require("../db/index")

getSkills = async (req, res, next) => {
    try {
        let skills = await db.any(`SELECT * FROM skills`)
        res.status(200).json({
            status: "successful",
            message: "Got all skills",
            body: {
                skills
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Error",
            message: "Could not get skills"
        })
        next(error)
    }
}

addSingleSkill= async (req, res, next) => {
    let { name, artist_id, client_id } = req.body
    try {
        let skill;
        if (!client_id) {
            skill = await db.one(`INSERT INTO skills (name, artist_id ) VALUES($1, $2) RETURNING *`, [
                name, artist_id
            ])
        } else {
            skill = await db.one(`INSERT INTO skills (name, client_id ) VALUES($1, $2) RETURNING *`, [
                name, client_id
            ])
        }
        res.status(200).json({
            status: "success",
            message: "Added a single skill",
            body: {
                skill
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: "Error",
            message: "Could not add a skill"
        })
        next(error)
    }
}

getAllSkillsByName = async (res, req, next) => {
    try {
        
    } catch (error) {
        
    }
}

getSkillById = async (res, req, next) => {
    try {
        let { id } = req.params;
        let skill = await db.one("SELECT * FROM skills WHERE id = $1", [id])
        res.status(200).json({
            status: "Success",
            message: "Retrieved a single skill",
            body: {
                skill
            }
        })
    } catch (error) {
        res.json({
            status: "Error",
            message: `Could not retrieve a skill by id: ${id}`
        })
    }
}

deleteSingleSkill = async (res, req, next) => {
    try {
        let { id } = req.params;
        res.status(200).json({
            status: "Success",
            message: "Deleted a single skill",
            body: {
                deleted_skill : await db.one("DELETE FROM skills WHERE id = $1 RETURNING *", [id])
            }
        })
    } catch (error) {
        res.json({
            status: "Error",
            message: `Could not delete a skill, id: ${id}`
        })
    }
}

module.exports = {
    addSingleSkill,
    getSkills
    // getSkillById,
    // getAllSkillsByName,
    // deleteSingleSkill
}