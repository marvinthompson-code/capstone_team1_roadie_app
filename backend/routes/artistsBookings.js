const artistBookings = require("express").Router({ mergeParams: true });
const { getAllArtistBookings } = require("../queries/bookingsQueries");

artistBookings.get("/bookings", getAllArtistBookings);

module.exports = artistBookings;