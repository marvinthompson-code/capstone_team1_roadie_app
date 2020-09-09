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
  getSingleArtistVideo,
  getSingleClientVideo,
  getSingleArtistPicture,
  getSingleClientPicture
} = require("../queries/mediaQueries");

media.get("/pictures", getPictures); //tested
media.post("/pictures", addNewPicture); //tested
media.get("/pictures/artist/:artist_id", getPicturesByArtistId); //tested
media.get("/pictures/client/:client_id", getPicturesByClientId); //tested
media.get("/pictures/artist/:artist_id/picture/:id", getSingleArtistPicture)// tested
media.get("/pictures/client/:client_id/picture/:id", getSingleClientPicture) //tested
media.delete("/pictures/:id", deleteSinglePicture); //tested
media.put("/pictures/:id", editCaptionForVideo); //tested

media.get("/videos", getVideos); //tested
media.post("/videos", addNewVideo); //tested
media.get("/videos/artist/:artist_id", getVideosByArtistId); //tested
media.get("/videos/client/:client_id", getVideosByClientId); //tested
media.get("/videos/artist/:artist_id/video/:id", getSingleArtistVideo) //tested
media.get("/videos/client/:client_id/video/:id", getSingleClientVideo) //tested
media.delete("/videos/:id", deleteSingleVideo); //tested
media.put("/videos/:id", editCaptionForVideo); //tested

module.exports = media;
