const db = require("../db/index");

const getAllBookings = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved all bookings!",
            body: {
                all_bookings: await db.any("SELECT * FROM bookings")
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve all bookings!"
        });
        next(error);
    }
};

const getSingleBooking = async (req, res, next) => {

    let { id } = req.params;

    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved a booking!",
            body: {
                single_booking: await db.one("SELECT * FROM bookings WHERE id = $1", [id])
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve a booking!"
        });
        next(error);
    }
};

const addBooking = async (req, res, next) => {
    
    let { 
        id,
        artist_id,
        client_id,
        event_id,
        venue,
        date,
        cause_for_event,
        contact_info
    } = req.body;

    try {
        res.status(200).json({
            status: "Success",
            message: "New booking created!",
            body: {
                new_booking: await db.one(
                    "INSERT INTO bookings (id, artist_id, client_id, event_id, venue, date, cause_for_event, contact_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                    [id, artist_id, client_id, event_id, venue, date, cause_for_event, contact_info]
                )
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to add a booking!"
        });
        next(error);
    }
};

const updateBookingInfo = async (req, res, next) => {
    
    let { id } = req.params;
    let {
        artist_id,
        client_id,
        event_id,
        venue,
        date,
        cause_for_event,
        contact_info
    } = req.body;
    
    try {
        res.status(200).json({
            status: "Success",
            message: "Updated booking information!",
            body: {
                updated_booking: await db.one(
                    "UPDATE bookings SET artist_id = $1, client_id = $2, event_id = $3, venue = $4, date = $5, cause_for_event = $6, contact_info = $7 WHERE id = $8",
                    [artist_id, client_id, event_id, venue, date, cause_for_event, contact_info, id]
                )
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to update booking information!"
        });
        next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    
    let { id } = req.params;
    
    try {
        res.status(200).json({
            status: "Success",
            message: "Booking deleted!",
            body: {
                deleted_booking: await db.one("SELECT * FROM bookings WHERE id = $1", [id])
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to delete booking!"
        });
        next(error);
    }
};

module.exports = {
    getAllBookings,
    getSingleBooking,
    addBooking,
    updateBookingInfo,
    deleteBooking
};