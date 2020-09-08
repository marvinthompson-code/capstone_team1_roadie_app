const db = require("../db/index");

const getLineupForEvent = async (req, res, next) => {
  const { event_id } = req.params;
  try {
    const lineup = await db.any(
      "SELECT * FROM lineup INNER JOIN events ON lineup.event_id = events.id WHERE event_id = $1",
      [event_id]
    );
    res.status(200).json({
      status: "success",
      message: "was able to get lineup",
      body: {
        lineup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "was not able to get the lineup",
    });
  }
};

const getLineupInfo = async (req, res, next) => {
  try {
    const lineup = await db.any(
      "SELECT artists.id AS artist_id, artists.name AS artist_name, profile_pic_url, bio, pricing, genre, artists.city AS artist_city, contact_info, lineup_id, event_id, lineup_events.name AS event_name, venue, lineup_events.date, address, lineup_events.city AS event_city FROM artists INNER JOIN (SELECT lineup.id AS lineup_id, event_id, artist_id, name, venue, date, address, city, client_id FROM lineup INNER JOIN events ON lineup.event_id = events.id) AS lineup_events ON artists.id = lineup_events.artist_id WHERE event_id = $1",
      [event_id]
    );
    res.status(200).json({
      status: "success",
      message: "was able to get lineup's info",
      body: {
        lineup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "was not able to get the lineup",
    });
  }
};

const addSingleArtistToLineup = async (req, res, next) => {
  const { event_id, artist_id } = req.params;
  try {
    const newLineup = await db.one(
      "INSERT INTO lineup (event_id, artist_id) VALUES ($1, $2) RETURNING *",
      [event_id, artist_id]
    );
    res.status(200).json({
      status: "success",
      message: "artist successfully added to event lineup",
      body: {
        newLineup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "was not able to add artist to lineup",
    });
  }
};

module.exports = { getLineupForEvent, addSingleArtistToLineup, getLineupInfo };
