import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./uploadModalSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";


const ClientPortfolio = () => {
  const client = useSelector((state) => state.client);
  const [name, setName] = useState("");
  const [video, setVideos] = useState([]);
  const [caption, setCaption] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const API = apiURL();
  const match = useRouteMatch();

  const handleClick = () => {
    dispatch(toggleModalState());
  };

  const displayUploadPictureButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button type="button" onClick={handleClick}>
          +picture
        </button>
      );
    }
  };

  const displayUploadVideoButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button type="button" onClick={handleClick}>
          +video
        </button>
      );
    }
  };

  const toPhotoAlbum = () => {
    debugger
    history.push(`/media/pictures/${client.id}`);
  };

  useEffect(() => {
    const fetchClient = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let { name, profile_pic_url } = res.data.body.single_client;
      setName(name);
      setProfilePic(profile_pic_url);
    };

    fetchClient(match.params.id);
  }, []);

  return (
    <div className="artistPortfolioContainer">
      <div className="portfolioHeader">
        <img id="portfolioPic" src={profilePic} />
      </div>
      <div className="artistMediaContainer">
        <div className="artistAlbumDiv">
          <h2>{name}'s Album</h2>
          {displayUploadPictureButton()}
          <input type="button" onClick={toPhotoAlbum} value={`${name}'s Photo Album`} />
        </div>
        <div className="artistVideoDiv">
          <h2>{name}'s Videos</h2>
          {displayUploadVideoButton()}
        </div>
      </div>
    </div>
  );
};
export default ClientPortfolio;
