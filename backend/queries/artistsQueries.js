const db = require("../db/index");

const getAllArtists = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Got all artists",
      body: {
        artists: await db.any("SELECT * FROM artists"),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Could not get all artists",
    });
    next(error);
  }
};

const getSingleArtistByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Got a single artist by id: " + id,
      body: {
        single_artist: await db.one("SELECT * FROM artists where id = $1", [
          id,
        ]),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `No artist by id ${id} found!`,
    });
    next(error);
  }
};

const addSingleArtist = async (req, res, next) => {
  let {
    id,
    name,
    profile_pic_url,
    bio,
    pricing,
    genre,
    city,
    contact_info,
  } = req.body;
  try {
    let added_single_artist = await db.one(
      "INSERT INTO artists (id, name, profile_pic_url, bio, pricing, genre, city, contact_info ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, name, profile_pic_url, bio, pricing, genre, city, contact_info]
    );
    res.status(200).json({
      status: "Success",
      message: "Added a single artist",
      body: added_single_artist,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Artist could not be added: " + error,
    });
    next(error);
  }
};

const deleteSingleArtist = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Deleted a single artist",
      body: {
        deleted_single_artist: db.one(
          "DELETE FROM artists WHERE id = $1 RETURNING *",
          [id]
        ),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not delete artist by id: ${id}`,
    });
    next(error);
  }
};

const searchForSingleArtist = async (req, res, next) => {
  let { name } = req.params;
  try {
    res.status(200).json({
      status: "Success",
      message: "Searched or artist by name " + name,
      body: {
        searched_artist: await db.any(
          "SELECT * FROM artists WHERE LOWER (name) LIKE $1",
          ["%" + name + "%"]
        ),
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Error",
      message: "Could not search for artist by name: " + name,
    });
    next(error);
  }
};

const updateArtistInfo = async (req, res, next,) => {
  try {
    let { id } = req.params;
    let { name, bio, contact_info } = req.body;
    res.status(200).json({
      status: "Success",
      message: "Updated artist's info!",
      body: {
        update_artist_info: await db.one(
          "UPDATE artists SET name = $1, bio = $2, contact_info = $3 WHERE id = $4 RETURNING *",
          [name, bio, contact_info, id]
        )
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to update artist info!"
    });
    next(error)
  }
};

const updateArtistProfilePic = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { profile_pic_url } = req.body;
    let updated_artist_profile_pic = await db.one(
      "UPDATE artists SET profile_pic_url = $1 WHERE id = $2 RETURNING *",
      [profile_pic_url, id]
    )
    res.status(200).json({
      status: "Success",
      message: "Updated artist's profile pic!",
      body: {
        updated_artist_profile_pic
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to update artist's profile pic!"
    });
    next(error);
  }
};

const getAllArtistBookings = async (req, res, next) => {
  let { id } = req.params;
  let artistBookings = await db.any("SELECT * FROM events INNER JOIN (SELECT bookings.id AS booking_id, client_id, event_id, bookings.bio AS bookings_bio, bookings.contact_info AS booking_contact_info, artists.id AS artist_id, name, profile_pic_url, artists.bio AS artist_bio, pricing, genre, city, artists.contact_info AS artist_contact_info FROM bookings INNER JOIN artists ON bookings.artist_id = artists.id) AS bookings_artists ON events.id = bookings_artists.event_id WHERE artist_id = $1", [id]);
  try {
      res.status(200).json({
          status: "Success",
          message: "Retrieved all bookings of artist!",
          body: {
              artistBookings
          }
      });
  } catch (error) {
      res.status(500).json({
          status: "Error",
          message: "Failed to retrieve all artist bookings!"
      });
      next(error);
  }
};

module.exports = {
  getAllArtists,
  getSingleArtistByID,
  addSingleArtist,
  deleteSingleArtist,
  searchForSingleArtist,
  updateArtistInfo,
  updateArtistProfilePic,
  getAllArtistBookings
};
