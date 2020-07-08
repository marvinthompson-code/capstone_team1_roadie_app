const clients = require("express").Router();

const {
  getAllClients,
  getSingleClientByID,
  addSingleClient,
  deleteSingleClient,
  searchForSingleClient,
} = require("../queries/clientsQueries");

const { checkFirebaseToken } = require("../middleware/auth");

clients.get("/", checkFirebaseToken, getAllClients);
clients.get("/:id", getSingleClientByID);
clients.post("/", addSingleClient);
clients.delete("/:id", deleteSingleClient);
clients.get("/search/:name", searchForSingleClient);

module.exports = clients;
