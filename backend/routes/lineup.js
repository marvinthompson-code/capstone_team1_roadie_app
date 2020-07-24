const lineup = require("express").Router();

const {getLineupForEvent} = require("../queries/lineupQueries");

lineup.get("/:event_id", getLineupForEvent);
// add artist to lineup
// delete singleArtist from lineup
// edit lineup
// delete lineup

module.exports = lineup;