const db = require("../db/index");

const getAllPortfolio = async (req, res, next) => {
  try {
    let allMedia = await db.any("SELECT * FROM portfolio");
    res.status(200).json({
      status: "success",
      message: "all media was retrieved",
      payload: allMedia,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "error",
      message: "could not retrieve the media",
    });
  }
};

const singleMedia = async (req, res, next) => {
  try {
    let singleItem = await db.one("SELECT * FROM portfolio WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "succes",
      message: "retrieved single item",
      payload: singleItem,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "could not retrieve the single media",
    });
  }
};

const addNewMedia = async (req, res, next) => {
  let { artist_id, picture, video, caption } = req.body;
  try {
    let newMedia = await db.one(
      `INSERT INTO portfolio (artist_id, picture, video, caption) VALUES ($1, $2, $3, $4) RETURNING *`,
      [artist_id, picture, video, caption]
    );
    res.status(200).json({
      status: "success",
      message: "added new content",
      body: newMedia,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "could not add content",
    });
  }
};

module.exports = { getAllPortfolio, singleMedia, addNewMedia };
