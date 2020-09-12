const db = require("../db/index");

const getAllBookings = async (req, res, next) => {
  let allBookings = await db.any("SELECT * FROM bookings");
  try {
    res.status(200).json({
      status: "Success",
      message: "Retrieved all bookings!",
      body: {
        allBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve all bookings!",
    });
    next(error);
  }
};


const getSingleBooking = async (req, res, next) => {
  let { id } = req.params;
  let singleBooking = await db.one("SELECT * FROM bookings WHERE id = $1", [
    id,
  ]);

  try {
    res.status(200).json({
      status: "Success",
      message: "Retrieved a booking!",
      body: {
        singleBooking,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve a booking!",
    });
    next(error);
  }
};

const addBooking = async (req, res, next) => {
  let { artist_id, client_id, event_id, bio, contact_info } = req.body;

  let newBooking = await db.one(
    "INSERT INTO bookings (artist_id, client_id, event_id, bio, contact_info) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [artist_id, client_id, event_id, bio, contact_info]
  );

  try {
    res.status(200).json({
      status: "Success",
      message: "New booking created!",
      body: {
        newBooking,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to add a booking!",
    });
    next(error);
  }
};

const updateBookingInfo = async (req, res, next) => {
  let { id } = req.params;
  let { artist_id, client_id, event_id, bio, contact_info } = req.body;

  let updatedBooking = await db.one(
    "UPDATE bookings SET artist_id = $1, client_id = $2, event_id = $3, bio = $4, contact_info = $5 WHERE id = $6",
    [artist_id, client_id, event_id, bio, contact_info, id]
  );

  try {
    res.status(200).json({
      status: "Success",
      message: "Updated booking information!",
      body: {
        updatedBooking,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to update booking information!",
    });
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  let { id } = req.params;
  let deletedBooking = await db.one("SELECT * FROM bookings WHERE id = $1", [
    id,
  ]);

  try {
    res.status(200).json({
      status: "Success",
      message: "Booking deleted!",
      body: {
        deletedBooking,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to delete booking!",
    });
    next(error);
  }
};

module.exports = {
  getAllBookings,
  getSingleBooking,
  addBooking,
  updateBookingInfo,
  deleteBooking,
};
