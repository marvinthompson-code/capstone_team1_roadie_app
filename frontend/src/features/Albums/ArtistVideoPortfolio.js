import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const ArtistVideoPortfolio = () => {
  const [videos, setVideos] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const API = apiURL();
  const match = useRouteMatch();

  const getUser = async (id) => {
    try {
      let res = await axios.get(`${API}/artists/${id}`);
      setUserInfo(res.data.body.single_artist);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUsersVideoAlbum = async (artist_id) => {
      let res = await axios.get(`${API}/media/videos/artist/${artist_id}`);
      setVideos(res.data.body.video);
    };
    getUser(match.params.artist_id);
    fetchUsersVideoAlbum(match.params.artist_id);
  }, []);
  const imgSize = {
    height: "auto",
    width: "100px",
  };
  const getUsersVideo = videos.map((video) => {
    return (
      <li>
        <div className="eachPhoto">
          <a
            value={video.url}
            data-target="#videoTarget"
            data-toggle="modal"
            onClick={() => {
              history.push(
                `/media/videos/artist/${match.params.artist_id}/video/${video.id}`
              );
            }}
          >
            <video
              alt={video.caption}
              src={video.url}
              style={imgSize}
              control
            />

            <p id="imgCaption">{video.caption}</p>
          </a>
        </div>
      </li>
    );
  });

  return (
    <div className="container position-absolute userAlbums">
      <div className="row justify-content-center">
        <h2 id="usersAlbumHeader">{userInfo.name}'s Album</h2>
      </div>
      <div className="jumbotron albumJumbo text-center">
        <ul className="allPhotos">{getUsersVideo}</ul>
      </div>
    </div>
  );
};
export default ArtistVideoPortfolio;
