import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../css/SearchResultItem.css";

const SearchResultItem = ({ result }) => {
  const userType = useSelector((state) => state.userType);
  const { name, profile_pic_url, id, genre } = result;

  const history = useHistory();

  const setHistory = (id) => {
    if (userType === "Artist") {
      history.push(`/artist/${id}`);
    } else if (userType === "Client") {
      history.push(`/client/${id}`);
    }
  };

  return (
    <div className="container-fluid resultItem" onClick={() => setHistory(id)}>
      <div className="picDisplay">
        <img id="profilePic" src={profile_pic_url} />
      </div>
      <div className="nameDisplay">
        <h1 className="name">{name}</h1>
        <p className="searchResultItem">{genre}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
