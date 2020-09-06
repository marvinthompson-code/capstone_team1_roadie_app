import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { apiURL } from "../../../util/apiURL";
import ReactPlayer from "react-player";
import axios from "axios";
import "../../../css/ClientVideoPlayer.css";

const ClientVideoPlayer = () => {
  const [user, setUser] = useState({});
  const match = useRouteMatch();
  const API = apiURL();

  useEffect(() => {
    const fetchClientVideo = async (client_id, id) => {
      let res = await axios.get(
        `${API}/media/videos/client/${client_id}/video/${id}`
      );

      setUser(res.data.body.singleVideo);
    };
    fetchClientVideo(match.params.client_id, match.params.id);
  }, []);

  return (
    <div className="container clientVideoPlayer">
      <div className="jumbotron ClientVideoPlayerJumbo">
        <h1 className="display-4 clientCaptionVid">{user.caption}</h1>
        <ReactPlayer className="react-player" url={user.url} controls />
      </div>
    </div>
  );
};
export default ClientVideoPlayer;
