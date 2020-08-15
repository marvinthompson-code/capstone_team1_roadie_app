import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toggleModalState} from './uploadModalSlice';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";
import "../../css/Portfolio.css"
import PictureCarousel from "./PictureCarousel";

const ClientPortfolio = () => {
  const client = useSelector((state) => state.client);
  const [name, setName] = useState("");
  const [video, setVideos] = useState([]);
  const [caption, setCaption] = useState("");
  const [pictures, setPictures] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const API = apiURL();
  const match = useRouteMatch();

    const handleClick = () =>{
    dispatch(toggleModalState())
    }


  // const insertPictureIntoAlbum = async () => {
  //   try {
  //     await axios.post(`${API}/media/pictures`, {
  //       artist_id: artist.id,
  //       caption: caption,
  //       url: imageUrl,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const displayUploadPictureButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button type="button" onClick={handleClick}>
            +picture
          </button>
      )
    }
  }

  const displayUploadVideoButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
      <button type="button" onClick={handleClick}>
              +video
          </button>
      )
    }
  }

  useEffect(() => {
    const fetchClient = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      debugger
      let { name, profile_pic_url } = res.data.body.single_client;
      setName(name);
      setProfilePic(profile_pic_url);
    };
    const fetchClientPictures = async (id) => {
      let res = await axios.get(`${API}/media/clients/${id}/pictures`);
      debugger
      let { picture } = res.data.body.picture;
      setPictures(picture);
    };
    const fetchClientVideos = async (id) => {
      let res = await axios.get(`${API}/media/clients/${id}/videos`);
      let { video } = res.data.body.video;
      setVideos(video);
    };
    fetchClient(match.params.id);
    fetchClientPictures(match.params.id);
    fetchClientVideos(match.params.id);
  }, []);

  return (
    <div className="artistPortfolioContainer">
      <div className="portfolioHeader">
        <img id="portfolioPic"src={profilePic} />
      </div>
      <div className="artistMediaContainer">
        <div className="artistAlbumDiv">
          <h2>{name}'s Album</h2>
          {displayUploadPictureButton()}
          <PictureCarousel />
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
