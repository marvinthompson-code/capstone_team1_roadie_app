const db = require("../db/index");

const getAllPortfolio =  async (req, res, next) =>{
    try{
        let allMedia = await db.any("SELECT * FROM portfolio");
        res.status(200).json({
            status: 'success',
            message: "all media was retrieved",
            payload: allMedia 
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            status: "error",
            message: "could not retrieve the media"
        })
    }
};

const singleMedia = async (req, res, next) =>{
    try{
        let singleItem = await db.one("SELECT * FROM portfolio WHERE id = $1", [req.params.id]);
        res.status(200).json({
            status: 'succes',
            message: 'retrieved single item',
            payload: singleItem
        })

    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve the single media'
        })

    }
};

const addNewMedia = async (req, res, next) =>{
    try{
        let newMedia = await db.one(`INSERT INTO portfolio(artist_id, picture, video, caption) VALUES('${req.body.artist_id}','${req.body.picture}','${req.body.video}', '${req.body.caption}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: "added new content",
            payload: newMedia
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'could not add content',
        })

    }
}

module.exports = {getAllPortfolio, singleMedia, addNewMedia}