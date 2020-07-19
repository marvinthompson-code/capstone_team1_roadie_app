const media = require("express").Router();

const {
    getPictures,
    getVideos,
    addNewPicture,
    addNewVideo,
    deleteSingleVideo,
    deleteSinglePicture
} = require("../queries/mediaQueries");

media.get("/pictures", getPictures);//tested
media.get("/videos", getVideos);//tested
media.post("/pictures", addNewPicture);//tested
media.post("/videos", addNewVideo);//tested
media.delete("/videos/:id", deleteSingleVideo)//tested
media.delete("/pictures/:id", deleteSinglePicture)//tested

module.exports = media;