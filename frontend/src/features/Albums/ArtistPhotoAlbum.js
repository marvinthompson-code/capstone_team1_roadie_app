import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const ArtistPhotoAlbum = () => {
  const [pictures, setPictures] = useState([]);
  const API = apiURL();
  const match = useRouteMatch();

  useEffect(() => {
    debugger
    const fetchUsersPhotoAlbum = async (id) => {
      let res = await axios.get(`${API}/media/pictures/${id}`);
      setPictures(res.data.body.picture);
    };
    fetchUsersPhotoAlbum(match.params.id);
  }, []);

  const imgSize = {
    height: "auto",
    width: "400px"
  }

  const getUsersPictures = pictures.map((picture) => {
    return (
      <div>
        <li>
          <img style={imgSize} alt={picture.caption} src={picture.url} />
          <p>{picture.caption}</p>
        </li>
      </div>
    );
  });

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        <ul>{getUsersPictures}</ul>
      </div>
    </div>
  );
};
export default ArtistPhotoAlbum;
