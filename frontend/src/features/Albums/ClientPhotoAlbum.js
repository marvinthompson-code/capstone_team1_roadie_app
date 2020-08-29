import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const ClientPhotoAlbum = () => {
  const [pictures, setPictures] = useState([]);
  const API = apiURL();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchUsersPhotoAlbum = async (id) => {
      let res = await axios.get(`${API}/media/pictures/${id}`);
      setPictures(res.data.body.picture);
    };
    fetchUsersPhotoAlbum(match.params.id);
  }, []);

  const getUsersPictures = pictures.map((picture) => {
    return (
      <div>
        <li>
          <img alt={picture.caption} src={picture.url} />
          <p>{picture.caption}</p>
        </li>
      </div>
    );
  });

  return (
    <div>
      <h1></h1>
      <div>
        <ul>{getUsersPictures}</ul>
      </div>
    </div>
  );
};
export default ClientPhotoAlbum;
