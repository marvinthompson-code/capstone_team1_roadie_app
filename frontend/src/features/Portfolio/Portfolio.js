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
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button type="button" className="uploadBtn" onClick={handleClick}>
          +Upload picture
        </button>
      );
    }
  };

  const displayUploadVideoButton = () => {
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button type="button" className="uploadBtn" onClick={handleClick}>
          +Upload video
        </button>
      );
    }
  };
  const toPhotoAlbum = () => {
    history.push(`/media/pictures/${match.params.id}`);
  };
  const toVideoAlbum = () => {
    history.push(`/media/videos/${match.params.id}`);
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
          <h2>{name}'s Videos</h2>
          </div>
          <div className="artistButtonAlbumDiv">
          {displayUploadVideoButton()}
          <input
            type="button"
            id="uploadArtistButton"
            onClick={toVideoAlbum}
            value={`${name}'s Photo Videos`}
          />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtistPortfolio;
