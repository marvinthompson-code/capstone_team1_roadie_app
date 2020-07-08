const artists = require("express").Router();

const {
  getAllArtists,
  getSingleArtistByID,
  addSingleArtist,
  deleteSingleArtist,
  searchForSingleArtist,
} = require("../queries/artistsQueries");

artists.get("/", getAllArtists);
artists.get("/:id", getSingleArtistByID);
artists.post("/", addSingleArtist);
artists.delete("/:id", deleteSingleArtist);
artists.get("/search/:name", searchForSingleArtist);

module.exports = artists;
