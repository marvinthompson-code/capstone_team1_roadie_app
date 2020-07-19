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
      body: {
        picture,
      },
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
      body: {
        picture,
      },
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
const deleteSingleVideo = async (req, res, next) =>{
  try{
    let {id} = req.params;
    let deletedVideo = await db.one('DELETE FROM videos WHERE id = $1 RETURNING *', [id]);
    res.status(200).json({
      status: 'succes',
      message: 'Deleted the single video',
      body: deletedVideo
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: 'Could not delete the video'
    })
  }
};
const deleteSinglePicture = async (req, res, next) =>{
  try{
    let {id} = req.params;
    let deletedPicture = await db.one('DELETE FROM pictures WHERE id = $1 RETURNING *', [id]);
    res.status(200).json({
      status: 'succes',
      message: 'Deleted the single video',
      body: deletedPicture
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: 'Could not delete the video'
    })
  }
}


module.exports = {
  getPictures,
  getVideos,
  addNewPicture,
  addNewVideo,
  deleteSingleVideo,
  deleteSinglePicture
};
