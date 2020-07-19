const media = require("express").Router();

const {
    getPictures,
    getVideos,
    addNewPicture,
    addNewVideo
} = require("../queries/mediaQueries");

media.get("/pictures", getPictures);
media.get("/videos", getVideos);
media.post("/pictures", addNewPicture);
media.post("/videos", addNewVideo);

module.exports = media;