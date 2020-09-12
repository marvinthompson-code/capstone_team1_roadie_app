import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const ClientPhotoAlbum = () => {
  const [pictures, setPictures] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const API = apiURL();
  const match = useRouteMatch();

  const getClient = async (id) => {
    try {
      let res = await axios.get(`${API}/clients/${id}`);
      setUserInfo(res.data.body.single_client);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUsersPhotoAlbum = async (client_id) => {
      let res = await axios.get(`${API}/media/pictures/client/${client_id}`);
      setPictures(res.data.body.picture);
    };
    getClient(match.params.client_id);
    fetchUsersPhotoAlbum(match.params.client_id);
  }, []);

  const imgSize = {
    height: "auto",
    width: "200px",
  };

  const getUsersPictures = pictures.map((picture) => {
    return (
      <li>
        <div className="eachPhoto">
          <img
            style={imgSize}
            alt={picture.caption}
            src={picture.url}
            id="singlePhoto"
          />
          <p id="imgCaption">{picture.caption}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="container position-absolute userAlbums">
      <div className="row justify-content-center">
        <h2 id="usersAlbumHeader">{userInfo.name}'s Album</h2>
      </div>
      <div className="jumbotron albumJumbo text-center">
        <ul className="allPhotos">{getUsersPictures}</ul>
      </div>
    </div>
  );
};
export default ClientPhotoAlbum;
