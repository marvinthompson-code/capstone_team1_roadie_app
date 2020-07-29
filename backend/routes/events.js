const events = require("express").Router();

const {
  getAllEventsBySingleClient,
  addSingleEvent,
  getAllEventsByName,
  deleteSingleEvent,
  getSingleEventById
} = require("../queries/eventQueries");

events.get("/:client_id", getAllEventsBySingleClient);
events.post("/", addSingleEvent);
events.get("/:name", getAllEventsByName);
events.delete("/:id", deleteSingleEvent);
events.get("/:id/:client_id", getSingleEventById);

module.exports = events;
