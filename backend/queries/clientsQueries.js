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
      "INSERT INTO clients (id, name, profile_pic_url, bio, city, contact_info) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
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
    let deleted_single_client = db.one(
      "DELETE FROM clients WHERE id = $1 RETURNING *",
      [id]
    );
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

const updateClientInfo = async (req, res, next,) => {
  try {
    let { id } = req.params;
    let { name, profile_pic_url, bio, contact_info } = req.body;
    res.status(200).json({
      status: "Success",
      message: "Updated client's info!",
      body: {
        update_artist_info: await db.one(
          "UPDATE clients SET name = $1, profile_pic_url = $2, bio = $3, contact_info = $4 WHERE id = $5",
          [name, profile_pic_url, bio, contact_info, id]
        )
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to update client info!"
    });
    next(error)
  }
};

module.exports = {
  getAllClients,
  getSingleClientByID,
  addSingleClient,
  deleteSingleClient,
  searchForSingleClient,
  updateClientInfo
};
