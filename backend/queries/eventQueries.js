const db = require("../db/index");

const getAllEventsBySingleClient = async (req, res, next) => {
  let { client_id } = req.params;
  try {
    let events = await db.any(`SELECT * FROM events WHERE client_id = $1`, [
      client_id,
    ]);
    res.status(200).json({
      status: "successful",
      message: "Got all events by client id",
      body: {
        events,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Could not get events",
    });
    next(error);
  }
};

const addSingleEvent = async (req, res, next) => {
  let { name, venue, date, address, city, client_id } = req.body;
  try {
    let event = await db.one(
      `INSERT INTO events (name, venue, date, address, city, client_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, venue, date, address, city, client_id]
    );
    res.status(200).json({
      status: "success",
      message: "Added a single event by client_id: " + client_id,
      body: {
        event,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Error",
      message: "Could not add a event",
    });
    next(error);
  }
};

const getAllEventsByName = async (res, req, next) => {
  let { name } = req.params;
  try {
    let event = await db.one(
      `SELECT events.id AS event_id, events.name AS event_name, venue, date, address, events.city AS events_city, client_id, clients.name AS client_name, profile_pic_url, bio, clients.city AS client_city, contact_info FROM events INNER JOIN clients ON events.client_id = clients.id WHERE clients.name = $1`,
      [name]
    );
    res.status(200).json({
      status: "success",
      message: "Got all events by client name: " + name,
      body: {
        event,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Error",
      message: "Could not get any events for client name: " + name,
    });
    next(error);
  }
};

const deleteSingleEvent = async (res, req, next) => {
  let { id } = req.params;
  try {
    let deleted_event = await db.one(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({
      status: "Success",
      message: "Deleted a single event",
      body: {
        deleted_event,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not delete a event, id: ${id}`,
    });
  }
};

module.exports = {
  getAllEventsBySingleClient,
  addSingleEvent,
  getAllEventsByName,
  deleteSingleEvent,
};
