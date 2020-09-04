const media = require("express").Router();

const {
  getPictures,
  getVideos,
  addNewPicture,
  addNewVideo,
  deleteSingleVideo,
  deleteSinglePicture,
  getPicturesByArtistId,
  getPicturesByClientId,
  getVideosByArtistId,
  getVideosByClientId,
  editCaptionForVideo,
} = require("../queries/mediaQueries");

media.get("/pictures", getPictures); //tested
media.post("/pictures", addNewPicture); //tested
media.get("/pictures/artist/:artist_id", getPicturesByArtistId); //tested
media.get("/pictures/client/:client_id", getPicturesByClientId); //tested
media.delete("/pictures/:id", deleteSinglePicture); //tested
media.put("/pictures/:id", editCaptionForVideo); //tested

media.get("/videos", getVideos); //tested
media.post("/videos", addNewVideo); //tested
media.get("/videos/artist/:artist_id", getVideosByArtistId); //tested
media.get("/videos/client/:client_id", getVideosByClientId); //tested
media.delete("/videos/:id", deleteSingleVideo); //tested
media.put("/videos/:id", editCaptionForVideo); //tested

module.exports = media;
