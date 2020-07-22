const db = require("../db/index");

const getAllUsers = async (req, res, next) => {
  try {
    let users = await db.any("SELECT * FROM users");
    res.status(200).json({
      status: "Success",
      message: "Got all users",
      body: {
        users,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Could not get all users",
    });
    next(error);
  }
};

const getSingleUserById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let single_user = await db.one("SELECT * FROM users where id = $1", [id]);
    res.status(200).json({
      status: "Success",
      message: "Got a single User by id: " + id,
      body: {
        single_user,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `No User by id ${id} found!`,
    });
    next(error);
  }
};

const addSingleUser = async (req, res, next) => {
  let {
    id,
    name,
    profile_pic_url,
    bio,
    pricing,
    genre,
    city,
    contact_info,
  } = req.body;
  try {
    let added_single_User = await db.one(
      "INSERT INTO users (id, name, profile_pic_url, bio, pricing, genre, city, contact_info ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, name, profile_pic_url, bio, pricing, genre, city, contact_info]
    );
    res.status(200).json({
      status: "Success",
      message: "Added a single User",
      body: added_single_User,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "User could not be added: " + error,
    });
    next(error);
  }
};

const deleteSingleUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    let deleted_single_user = db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({
      status: "Success",
      message: "Deleted a single User",
      body: {
        deleted_single_user,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not delete User by id: ${id}`,
    });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUserById,
  addSingleUser,
  deleteSingleUser,
};
