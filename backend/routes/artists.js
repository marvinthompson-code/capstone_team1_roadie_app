const artists = require("express").Router();

const {
  getAllArtists,
  getSingleArtistByID,
  addSingleArtist,
  deleteSingleArtist,
  searchForSingleArtist,
  updateArtistInfo
} = require("../queries/artistsQueries");

// const { checkFirebaseToken } = require("../middleware/auth");

artists.get("/", getAllArtists);
artists.get("/:id", getSingleArtistByID);
artists.post("/", addSingleArtist);
artists.delete("/:id", deleteSingleArtist);
artists.get("/search/:name", searchForSingleArtist);
artists.patch("/:id", updateArtistInfo);

module.exports = artists;
