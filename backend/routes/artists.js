const artists = require("express").Router();

const {
  getAllArtists,
  getSingleArtistByID,
  addSingleArtist,
  deleteSingleArtist,
  searchForSingleArtist,
  updateArtistInfo,
  updateArtistProfilePic,
  getAllArtistBookings
} = require("../queries/artistsQueries");

// const { checkFirebaseToken } = require("../middleware/auth");

artists.get("/", getAllArtists);
artists.get("/:id", getSingleArtistByID);
artists.post("/", addSingleArtist);
artists.delete("/:id", deleteSingleArtist);
artists.get("/search/:name", searchForSingleArtist);
artists.patch("/info/:id", updateArtistInfo);
artists.patch("/:id", updateArtistProfilePic)
artists.get("/:id/bookings", getAllArtistBookings)

module.exports = artists;
