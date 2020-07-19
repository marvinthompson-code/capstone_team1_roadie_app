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
      picture = await db.one(
        `INSERT INTO videos (artist_id, caption ) VALUES($1, $2) RETURNING *`,
        [artist_id, caption]
      );
    } else {
      picture = await db.one(
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

// const deleteSingleSkill = async (res, req, next) => {
//   try {
//     let { id } = req.params;
//     res.status(200).json({
//       status: "Success",
//       message: "Deleted a single skill",
//       body: {
//         deleted_skill: await db.one(
//           "DELETE FROM skills WHERE id = $1 RETURNING *",
//           [id]
//         ),
//       },
//     });
//   } catch (error) {
//     res.json({
//       status: "Error",
//       message: `Could not delete a skill, id: ${id}`,
//     });
//   }
// };

// getAllSkillsByName = async (res, req, next) => {
//     try {

//     } catch (error) {

//     }
// }

// getSkillById = async (res, req, next) => {
//     try {
//         let { id } = req.params;
//         let skill = await db.one("SELECT * FROM skills WHERE id = $1", [id])
//         res.status(200).json({
//             status: "Success",
//             message: "Retrieved a single skill",
//             body: {
//                 skill
//             }
//         })
//     } catch (error) {
//         res.json({
//             status: "Error",
//             message: `Could not retrieve a skill by id: ${id}`
//         })
//     }
// }

module.exports = {
  getPictures,
  getVideos,
  addNewPicture,
  addNewVideo,
};
