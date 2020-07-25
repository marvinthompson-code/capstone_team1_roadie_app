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
      body: lineup,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "was not able to get the lineup",
    });
  }
};



// id
// event_id
// artist_id
// client_id

module.exports = { getLineupForEvent };
