import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/PhotoAlbum.css";
import IndividualPicture from "./IndividualPicture/IndividualPicture";

const ArtistPhotoAlbum = () => {
  const [pictures, setPictures] = useState([]);
  const [userInfo, setUserInfo] = useState({});
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
    const fetchUsersPhotoAlbum = async (artist_id) => {
      let res = await axios.get(`${API}/media/pictures/artist/${artist_id}`);
      setPictures(res.data.body.picture);
    };
    getUser(match.params.artist_id);
    fetchUsersPhotoAlbum(match.params.artist_id);
  }, []);

  const imgSize = {
    height: "auto",
    width: "200px",
  };

  const getUsersPictures = pictures.map((picture) => {
    return (
      <li>
        <div className="eachPhoto">
          <button
            type="button"
            data-toggle="modal"
            data-target="#singleImgModal"
          >
            <img
              style={imgSize}
              alt={picture.caption}
              src={picture.url}
              id="singlePhoto"
            />
          </button>
          <p id="imgCaption">{picture.caption}</p>
          <IndividualPicture />
        </div>
      </li>
    );
  });

  return (
    <div className="container userAlbums">

      <div className="jumbotron albumJumbo text-center">
        <h2 id="usersAlbumHeader" className="display-4">{userInfo.name}'s Album</h2>
        <ul className="allPhotos">{getUsersPictures}</ul>
      </div>
    </div>
  );
};
export default ArtistPhotoAlbum;
