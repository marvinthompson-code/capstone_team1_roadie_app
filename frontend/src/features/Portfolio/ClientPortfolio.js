import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./uploadModalSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";
import "../../css/ClientPortfolio.css";

const ClientPortfolio = () => {
  const client = useSelector((state) => state.client);
  const [name, setName] = useState("");
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
        <button
          type="button"
          className="btn btn-primary uploadPictureClientButton"
          data-toggle="modal"
          data-target="#uploadPictureModalCenter"
          onClick={handleClick}
        >
          Upload Picture
        </button>
      );
    }
  };

  const displayUploadVideoButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button
          type="button"
          className="btn btn-primary uploadVideoClientButton"
          data-toggle="modal"
          data-target="#uploadVideoModalCenter"
          onClick={handleClick}
        >
          Add Video
        </button>
      );
    }
  };

  const editProfileBtn = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button
          type="button"
          className="btn btn-primary editClientProfilePic"
          data-toggle="modal"
          data-target="#editClientProfilePicModalCenter"
        >
          Edit Profile Pic
        </button>
      );
    }
  };

  const toPhotoAlbum = () => {
    history.push(`/media/pictures/client/${match.params.id}`);
  };
  const toVideoAlbum = () => {
    history.push(`/media/videos/client/${match.params.id}`);
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
    <div className="clientPortfolioContainer">
      <div className="portfolioHeader">
        <img
          className="rounded float-left"
          id="portfolioImg"
          src={profilePic}
        />
        <div className={"col editBtnCol"}>{editProfileBtn()}</div>
      </div>
      <div className="clientMediaContainer">
        <div className="clientAlbumDiv">
          <div className="clientHeaderAlbumDiv">
            <h2 id="clientNameAlbum">{name}'s Album</h2>
          </div>
          <div className="clientButtonAlbumDiv">
            {displayUploadPictureButton()}
            <input
              type="button"
              id="uploadClientButton"
              onClick={toPhotoAlbum}
              value={`${name}'s Photo Album`}
            />
          </div>
        </div>
        <div className="clientVideoDiv">
          <div className="clientHeaderAlbumDiv">
            <h2 id="clientNameAlbum">{name}'s Videos</h2>
          </div>
          <div className="clientButtonAlbumDiv">
            {displayUploadVideoButton()}
            <input
              type="button"
              id="uploadClientButton"
              onClick={toVideoAlbum}
              value={`${name}'s Portfolio Videos`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientPortfolio;
