const events = require("express").Router();

const {
  getAllEventsBySingleClient,
  addSingleEvent,
  getAllEventsByName,
  deleteSingleEvent,
} = require("../queries/eventsQueries");

events.get("/:id", getAllEventsBySingleClient);
events.post("/", addSingleEvent);
events.get("/:name", getAllEventsByName);
events.delete("/:id", deleteSingleEvent);

module.exports = events;
