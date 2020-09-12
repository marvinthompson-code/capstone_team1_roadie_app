import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./uploadModalSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";
import "../../css/Portfolio.css";

const ArtistPortfolio = () => {
  const artist = useSelector((state) => state.artist);
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
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button type="button" className="btn btn-primary uploadPictureArtistButton" data-toggle="modal" data-target="#uploadPictureModalCenter" onClick={handleClick}>
          Upload Picture
        </button>
      );
    }
  };

  const displayUploadVideoButton = () => {
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button type="button" className="btn btn-primary uploadVideoArtistButton" data-toggle="modal" data-target="#uploadVideoModalCenter" onClick={handleClick}>
          Add Video
        </button>
      );
    }
  };

  const editProfileBtn = () => {
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button 
          type="button" 
          className="btn btn-primary editArtistProfilePic" 
          data-toggle="modal" 
          data-target="#editArtistProfilePicModalCenter"
        >
          Edit Profile Pic
        </button>
      )
    }
  };

  const toPhotoAlbum = () => {
    history.push(`/media/pictures/artist/${match.params.id}`);
  };
  const toVideoAlbum = () => {
    history.push(`/media/videos/artist/${match.params.id}`);
  };

  useEffect(() => {
    const fetchArtist = async (id) => {
      let res = await axios.get(`${API}/artists/${id}`);
      let { name, profile_pic_url } = res.data.body.single_artist;
      setName(name);
      setProfilePic(profile_pic_url);
    };
    fetchArtist(match.params.id);
  }, []);

  return (
    <div className="artistPortfolioContainer">
      <div className="portfolioHeader">
        <img
          className="rounded float-left"
          id="portfolioImg"
          src={profilePic}
        />
        <div className={"col"}>{editProfileBtn()}</div>
      </div>
      <div className="artistMediaContainer">
        <div className="artistAlbumDiv">
          <div className="artistHeaderAlbumDiv">
          <h2 id="artistNameAlbum">{name}'s Album</h2>
          </div>
          <div className="artistButtonAlbumDiv">
          {displayUploadPictureButton()}
          <input
            type="button"
            id="uploadArtistButton"
            onClick={toPhotoAlbum}
            value={`${name}'s Photo Album`}
          />
          </div>
        </div>
        <div className="artistVideoDiv">
        <div className="artistHeaderAlbumDiv">
          <h2 id="artistNameAlbum">{name}'s Videos</h2>
          </div>
          <div className="artistButtonAlbumDiv">
          {displayUploadVideoButton()}
          <input
            type="button"
            id="uploadArtistButton"
            onClick={toVideoAlbum}
            value={`${name}'s Portfolio Videos`}
          />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtistPortfolio;
