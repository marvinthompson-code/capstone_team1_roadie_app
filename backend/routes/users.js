const users = require("express").Router();

const {
  getAllUsers,
  getSingleUserById,
  addSingleUser,
  deleteSingleUser,
} = require("../queries/usersQueries");

// const { checkFirebaseToken } = require("../middleware/auth");

users.get("/", getAllUsers);
users.get("/:id", getSingleUserById);
users.post("/", addSingleUser);
users.delete("/:id", deleteSingleUser);

module.exports = users;
