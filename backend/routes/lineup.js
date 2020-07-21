const lineup = require("express").Router();

const {getLineupForEvent} = require("../queries/lineupQueries");

lineup.get("/:event_id", getLineupForEvent);

module.exports = lineup;