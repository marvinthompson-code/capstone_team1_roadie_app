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
          "SELECT * FROM artists WHERE name LIKE $1",
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
    let { name, profile_pic_url, bio, contact_info } = req.body;
    res.status(200).json({
      status: "Success",
      message: "Updated artist's info!",
      body: {
        update_artist_info: await db.one(
          "UPDATE artists SET name = $1, profile_pic_url = $2, bio = $3, contact_info = $4 WHERE id = $5",
          [name, profile_pic_url, bio, contact_info, id]
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

module.exports = {
  getAllArtists,
  getSingleArtistByID,
  addSingleArtist,
  deleteSingleArtist,
  searchForSingleArtist,
  updateArtistInfo
};
