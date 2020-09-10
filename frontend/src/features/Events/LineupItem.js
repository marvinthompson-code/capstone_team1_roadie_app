import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../../util/apiURL";

const LineupItem = ({ artist }) => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [genre, setGenre] = useState("");
  const API = apiURL();
  const history = useHistory()

  const setHistory = (id) => {
    history.push(`/artist/${id}`);
  };

  useEffect(() => {
    const fetchArtistInfo = async (id) => {
      try {
        let res = await axios.get(`${API}/artists/${id}`);
        debugger;
        let { single_artist } = res.data.body;
        setName(single_artist.name);
        setGenre(single_artist.genre);
        setProfilePicture(single_artist.profile_pic_url);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArtistInfo(artist.artist_id);
  }, []);
  return (
    <div className="container-fluid resultItem" onClick={() => setHistory(artist.artist_id)}>
      <div className="picDisplay">
        <img id="profilePic" src={profilePicture} />
      </div>
      <div className="nameDisplay">
        <h1 className="name">{name}</h1>
      </div>
      <div className="genreDisplay">
        <p className="genre lead">{genre}</p>
      </div>
    </div>
  );
};

export default LineupItem;
