const db = require("../db/index");

const getAllClients = async (req, res, next) => {
  try {
    let clients = await db.any("SELECT * FROM clients");
    res.status(200).json({
      status: "Success",
      message: "Got all clients",
      body: {
        clients,
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
  let { id } = req.params;
  try {
    let single_client = await db.one("SELECT * FROM clients where id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "Success",
      message: "Got a single client by id: " + id,
      body: {
        single_client,
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
  let { id, name, profile_pic_url, bio, city, contact_info } = req.body;
  try {
    let added_single_client = db.one(
      "INSERT INTO clients (id, name, profile_pic_url, bio, city, contact_info) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, name, profile_pic_url, bio, city, contact_info]
    );
    res.status(200).json({
      status: "Success",
      message: "Added a single client",
      body: {
        added_single_client,
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
  let { id } = req.params;
  try {
    let deleted_single_client = db.one("DELETE FROM clients WHERE id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "Success",
      message: "Deleted a single client",
      body: {
        deleted_single_client,
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
  let { name } = req.params;
  try {
    let searched_client = await db.any(
      "SELECT * FROM clients WHERE name LIKE $1",
      ["%" + name + "%"]
    );
    res.status(200).json({
      status: "Success",
      message: "Searched or client by name " + name,
      body: {
        searched_client,
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
