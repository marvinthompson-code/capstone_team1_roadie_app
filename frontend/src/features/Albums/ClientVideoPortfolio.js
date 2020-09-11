import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const ClientVideoPortfolio = () => {
  const [videos, setVideos] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const history = useHistory();
  const API = apiURL();
  const match = useRouteMatch();

  const getUser = async (id) => {
    try {
      let res = await axios.get(`${API}/clients/${id}`);

      setUserInfo(res.data.body.single_client);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUsersVideoAlbum = async (client_id) => {
      let res = await axios.get(`${API}/media/videos/client/${client_id}`);
      setVideos(res.data.body.video);
    };
    getUser(match.params.client_id);
    fetchUsersVideoAlbum(match.params.client_id);
  }, []);
  const imgSize = {
    height: "auto",
    width: "200px",
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
                `/media/videos/client/${match.params.client_id}/video/${video.id}`
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
    <div className="container-fluid position-absolute userAlbums">
      <div className="row justify-content-center">
        <h2 id="usersAlbumHeader">{userInfo.name}'s Album</h2>
      </div>
      <div className="jumbotron albumJumbo text-center">
        <ul className="allPhotos">{getUsersVideo}</ul>
      </div>
    </div>
  );
};
export default ClientVideoPortfolio;
