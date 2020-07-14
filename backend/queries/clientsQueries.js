const db = require("../db/index");

const getAllClients = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Got all clients",
      body: {
        clients: await db.any("SELECT * FROM clients"),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Could not get all clients",
    });
    next(error);
  }
};

const getSingleClientByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Got a single client by id: " + id,
      body: {
        single_client: await db.one("SELECT * FROM clients where id = $1", [
          id,
        ]),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `No client by id ${id} found!`,
    });
    next(error);
  }
};

const addSingleClient = async (req, res, next) => {
  try {
    let { id, profile_pic_url, bio, city, contact_info } = req.body;
    res.status(200).json({
      status: "Success",
      message: "Added a single client",
      body: {
        added_single_client: db.one(
          "INSERT INTO clients (id, profile_pic_url, bio, city, contact_info) VALUES ($1, $2, $3, $4, $5)",
          [id, profile_pic_url, bio, city, contact_info]
        ),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Client could not be added: " + error,
    });
    next(error);
  }
};

const deleteSingleClient = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Deleted a single client",
      body: {
        deleted_single_client: db.one("DELETE FROM clients WHERE id = $1", [
          id,
        ]),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not delete client by id: ${id}`,
    });
    next(error);
  }
};

const searchForSingleClient = async (req, res, next) => {
  try {
    let { name } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Searched or client by name " + name,
      body: {
        searched_client: await db.any("SELECT * FROM clients WHERE name LIKE $1", 
        ['%' + name + '%']
        ),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Could not search for client by name: " + name,
    });
    next(error);
  }
};

module.exports = {
  getAllClients,
  getSingleClientByID,
  addSingleClient,
  deleteSingleClient,
  searchForSingleClient,
};
