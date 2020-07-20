const db = require("../db/index");

getSkills = async (req, res, next) => {
  try {
    let skills = await db.any(`SELECT * FROM skills`);
    res.status(200).json({
      status: "successful",
      message: "Got all skills",
      body: {
        skills,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Could not get skills",
    });
    next(error);
  }
};

addSingleSkill = async (req, res, next) => {
  let { name, artist_id, client_id } = req.body;
  try {
    let skill;
    if (!client_id) {
      skill = await db.one(
        `INSERT INTO skills (name, artist_id ) VALUES($1, $2) RETURNING *`,
        [name, artist_id]
      );
    } else {
      skill = await db.one(
        `INSERT INTO skills (name, client_id ) VALUES($1, $2) RETURNING *`,
        [name, client_id]
      );
    }
    res.status(200).json({
      status: "success",
      message: "Added a single skill",
      body: {
        skill,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Error",
      message: "Could not add a skill",
    });
    next(error);
  }
};

getSkillsClientById = async (req, res, next) => {
  try {
    let { client_id } = req.params;
    let skills = await db.any("SELECT * FROM skills WHERE client_id = $1", [
      client_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all skills from client, id:  ${client_id}`,
      body: {
        skills,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get skills from client id: ${client_id}`,
    });
    next(error);
  }
};

getSkillsArtistById = async (req, res, next) => {
  try {
    let { artist_id } = req.params;
    let skills = await db.any("SELECT * FROM skills WHERE artist_id = $1", [
      artist_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all skills from artist`,
      body: {
        skills,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get skills from artist`,
    });
    next(error);
  }
};

getSkillById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let skill = await db.one("SELECT * FROM skills WHERE id = $1", [id]);
    res.status(200).json({
      status: "Success",
      message: "Retrieved a single skill",
      body: {
        skill,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not retrieve a skill by id: ${id}`,
    });
  }
};

deleteSingleSkill = async (req, res, next) => {
  try {
    let { id } = req.params;
    let skill = await db.one("DELETE FROM skills WHERE id = $1 RETURNING *", [
      id,
    ]);
    res.status(200).json({
      status: "Success",
      message: "Deleted a single skill",
      body: {
        skill,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not delete a skill, id: ${id}`,
    });
    next(error);
  }
};

module.exports = {
  addSingleSkill,
  getSkills,
  getSkillsArtistById,
  getSkillsClientById,
  getSkillById,
  // getAllSkillsByName,
  deleteSingleSkill,
};
