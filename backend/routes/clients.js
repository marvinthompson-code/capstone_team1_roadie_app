const clients = require("express").Router();

const {
  getAllClients,
  getSingleClientByID,
  addSingleClient,
  deleteSingleClient,
  searchForSingleClient,
} = require("../queries/clientsQueries");

clients.get("/", getAllClients);
clients.get("/:id", getSingleClientByID);
clients.post("/", addSingleClient);
clients.delete("/:id", deleteSingleClient);
clients.get("/search/:name", searchForSingleClient);

module.exports = clients;
