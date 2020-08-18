import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { useHistory } from "react-router-dom";
import { receiveSearch } from "../SearchResults/searchSlice";
import { receiveUserType } from "../user/userSlice";
import axios from "axios";


const Search = () => {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const API = apiURL();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let routeExtension = name === "" ? "" : `/search/${name}`;
      if (userType === "Artist" && name === "") {
        let res = await axios.get(`${API}/artists`);
        dispatch(receiveSearch(res.data.body.artists));
      }
      if (userType === "Client" && name === "") {
        let res = await axios.get(`${API}/clients`);
        dispatch(receiveSearch(res.data.body.clients));
      }
      if (userType === "Artist") {
        let res = await axios.get(`${API}/artists` + routeExtension);
        dispatch(receiveSearch(res.data.body.searched_artist));
      } else if (userType === "Client") {
        let res = await axios.get(`${API}/clients` + routeExtension);
        dispatch(receiveSearch(res.data.body.searched_client));
      }
      dispatch(receiveUserType(userType));
      history.push("/results");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="row justify-content-md-center" >
        <div className="col col-lg-2">
        <input
          type={"text"} value={name} placeholder={"Search Roadie for Artists & Clients..."} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
          onChange={(e) => setName(e.target.value)}
          id="searchInput"
          />
          </div>
        <div className="form-group col-md-auto">
          <select className="custom-select" onChange={(e) => setUserType(e.target.value)}>
          <option selected>Search By...</option>
          <option value="Artist">Artist</option>
          <option value="Client">Client</option>
          </select>

        </div>
        <div className="col col-lg-2">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        </div>
          </div>
      </form>
    </div>
  );
};

export default Search;
