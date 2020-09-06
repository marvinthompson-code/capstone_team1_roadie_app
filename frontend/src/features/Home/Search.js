import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { useHistory } from "react-router-dom";
import { receiveSearch } from "../SearchResults/searchSlice";
import { receiveUserType } from "../user/userSlice";
import axios from "axios";
import "../../css/Search.css";

const Search = () => {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const API = apiURL();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let routeExtension = name === "" ? "" : `/search/${name.toLowerCase()}`;
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
      <form onSubmit={handleSubmit} className="roadieForm">
        <div className="row justify-content-md-center form-group" >

        <div className="col-sm-5">
        <input
          type={"text"} value={name} placeholder={"Search Roadie for Artists & Clients..."} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
          onChange={(e) => setName(e.target.value)}
          id="searchInput"
          />
          </div>

        <div className="col-sm-2">
          <select className="custom-select form-control roadieDropdown" onChange={(e) => setUserType(e.target.value)}>
          <option selected>Search By...</option>
          <option value="Artist">Artist</option>
          <option value="Client">Client</option>
          </select>
        </div>

        <div className="col-sm-1 roadieSearchButtonCol">
        <button className="btn btn-primary roadieSearchButton" type="submit">
          Submit
        </button>
        </div>

          </div>
      </form>
  );
};

export default Search;
