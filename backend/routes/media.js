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
    getVideosByClientId
} = require("../queries/mediaQueries");

media.get("/pictures", getPictures);//tested
media.post("/pictures", addNewPicture);//tested
media.get("/artists/:artist_id/pictures", getPicturesByArtistId)//tested
media.get("/clients/:client_id/pictures", getPicturesByClientId)//tested
media.delete("/pictures/:id", deleteSinglePicture)//tested

media.get("/videos", getVideos);//tested
media.post("/videos", addNewVideo);//tested
media.get("/artists/:artist_id/videos", getVideosByArtistId)//tested
media.get("/clients/:client_id/videos", getVideosByClientId)//tested
media.delete("/videos/:id", deleteSingleVideo)//tested


module.exports = media;