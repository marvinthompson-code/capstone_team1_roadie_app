import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { apiURL } from "../../../util/apiURL";
import axios from "axios";

const VideoPlayer = () => {
  const [user, setUser] = useState({});
  const match = useRouteMatch();
  const API = apiURL();

  useEffect(() => {
    debugger;
    const fetchArtistVideo = async (artist_id, id) => {
      let res = await axios.get(
        `${API}/media/videos/artist/${artist_id}/video/${id}`
      );
      debugger;
      setUser(res.data.body.singleVideo);
    };
    fetchArtistVideo(match.params.artist_id, match.params.id);
  }, []);

  return (
    <div>
      <h1>{user.caption}</h1>
      <video width="320" height="240" controls src={user.url}>
      </video>
    </div>
  );
};
export default VideoPlayer;
