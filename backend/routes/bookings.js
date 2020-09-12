const bookings = require("express").Router();
const {
  getAllBookings,
  getSingleBooking,
  addBooking,
  updateBookingInfo,
  getAllBookingsSingleArtist,
  deleteBooking,
} = require("../queries/bookingsQueries");

bookings.get("/", getAllBookings);
bookings.get("/:id", getSingleBooking);
bookings.post("/", addBooking);
bookings.patch("/:id", updateBookingInfo);
bookings.delete("/:id", deleteBooking);

module.exports = bookings;
