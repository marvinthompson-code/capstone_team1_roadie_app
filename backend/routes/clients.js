const clients = require("express").Router();

const {
  getAllClients,
  getSingleClientByID,
  addSingleClient,
  deleteSingleClient,
  searchForSingleClient,
  updateClientInfo
} = require("../queries/clientsQueries");

// const { checkFirebaseToken } = require("../middleware/auth");

clients.get("/", getAllClients);
clients.get("/:id", getSingleClientByID);
clients.post("/", addSingleClient);
clients.delete("/:id", deleteSingleClient);
clients.get("/search/:name", searchForSingleClient);
clients.patch("/:id", updateClientInfo);

module.exports = clients;
