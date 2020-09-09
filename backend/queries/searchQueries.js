const db = require("../db/index");

const searchByGenre = async (req, res, next) => {
    let { genre } = req.params;
    try {
        let searched_genre = await db.any(
            "SELECT * FROM artists WHERE LOWER (genre) LIKE $1",
            ["%" + genre + "%"]
        );
        res.status(200).json({
            status: "Success",
            message: `Searched for artists by ${genre} genre`,
            body: {
                searched_genre
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Could not search for artists by ${genre} genre`
        });
        next(error);
    }
};

module.exports = { searchByGenre };