const lineup = require("express").Router();

const {
  getLineupForEvent,
  addSingleArtistToLineup,
  getLineupInfo,
} = require("../queries/lineupQueries");

lineup.get("/:event_id", getLineupForEvent);
lineup.post("/", addSingleArtistToLineup);
lineup.get("/:event_id", getLineupInfo);
// delete singleArtist from lineup
// edit lineup
// delete lineup

module.exports = lineup;
