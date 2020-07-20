const db = require("../db/index");

const getPictures = async (req, res, next) => {
  try {
    let allPictures = await db.any("SELECT * FROM pictures");
    res.status(200).json({
      status: "successful",
      message: "Got all pictures",
      body: allPictures,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Could not get skills",
    });
    next(error);
  }
};
const getVideos = async (req, res, next) => {
  try {
    let allVideos = await db.any("SELECT * FROM videos");
    res.status(200).json({
      status: "successful",
      message: "Got all videos",
      body: allVideos,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Could not get skills",
    });
    next(error);
  }
};
const addNewVideo = async (req, res, next) => {
  let { artist_id, client_id, caption } = req.body;
  try {
    let video;
    if (!client_id) {
      video = await db.one(
        `INSERT INTO videos (artist_id, caption ) VALUES($1, $2) RETURNING *`,
        [artist_id, caption]
      );
    } else {
      video = await db.one(
        `INSERT INTO videos (client_id, caption ) VALUES($1, $2) RETURNING *`,
        [client_id, caption]
      );
    }
    res.status(200).json({
      status: "success",
      message: "Added a single video",
      body: video,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Error",
      message: "Could not add a skill",
    });
    next(error);
  }
};

const addNewPicture = async (req, res, next) => {
  let { artist_id, client_id, caption } = req.body;
  try {
    let picture;
    if (!client_id) {
      picture = await db.one(
        `INSERT INTO pictures (artist_id, caption ) VALUES($1, $2) RETURNING *`,
        [artist_id, caption]
      );
    } else {
      picture = await db.one(
        `INSERT INTO pictures (client_id, caption ) VALUES($1, $2) RETURNING *`,
        [client_id, caption]
      );
    }
    res.status(200).json({
      status: "success",
      message: "Added a single picture",
      body: picture,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Error",
      message: "Could not add a skill",
    });
    next(error);
  }
};
const deleteSingleVideo = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedVideo = await db.one(
      "DELETE FROM videos WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({
      status: "succes",
      message: "Deleted the single video",
      body: deletedVideo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "Could not delete the video",
    });
  }
};
const deleteSinglePicture = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedPicture = await db.one(
      "DELETE FROM pictures WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({
      status: "succes",
      message: "Deleted the single video",
      body: deletedPicture,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "Could not delete the video",
    });
  }
};

const getPicturesByArtistId = async (req, res, next) => {
  let { artist_id } = req.params;
  try {
    let picture = await db.any("SELECT * FROM pictures WHERE artist_id = $1", [
      artist_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all picture(s)`,
      body: { picture },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get picture(s)`,
    });
    next(error);
  }
};

const getPicturesByClientId = async (req, res, next) => {
  let { client_id } = req.params;
  try {
    let picture = await db.any("SELECT * FROM pictures WHERE client_id = $1", [
      client_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all picture(s) from client`,
      body: { picture },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get picture`,
    });
    next(error);
  }
};
const getVideosByArtistId = async (req, res, next) => {
  let { artist_id } = req.params;
  try {
    let video = await db.any("SELECT * FROM videos WHERE artist_id = $1", [
      artist_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all video(s) from artist`,
      body: { video },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get video(s)`,
    });
    next(error);
  }
};

const getVideosByClientId = async (req, res, next) => {
  let { client_id } = req.params;
  try {
    let video = await db.any("SELECT * FROM videos WHERE client_id = $1", [
      client_id,
    ]);
    res.status(200).json({
      status: "Success",
      message: `Retrieved all video(s) from client`,
      body: { video },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: `Could not get video(s)`,
    });
    next(error);
  }
};



module.exports = {
  getPictures,
  getVideos,
  addNewPicture,
  addNewVideo,
  deleteSingleVideo,
  deleteSinglePicture,
  getPicturesByArtistId,
  getPicturesByClientId,
  getVideosByArtistId,
  getVideosByClientId
};
