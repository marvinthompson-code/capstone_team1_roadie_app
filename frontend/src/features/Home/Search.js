import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import { useHistory } from 'react-router-dom'
import { receiveSearch } from "../SearchResults/searchSlice";
import { receiveUserType } from "../user/userSlice";
import axios from 'axios';
import "../../css/Search.css";

const Search = () => {
    const [userType, setUserType] = useState("")
    const [ name, setName ] = useState("")
    const history = useHistory()
    const API = apiURL()
    const dispatch = useDispatch();
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let routeExtension = name === "" ? "" : `/search/${name}`
            // declaring the variable, assignment, conditional. if name === "", set it to "" ELSE set it to /search/${name}

            if (userType === "Artist" && name === "") {
                let res = await axios.get(`${API}/artists`);
                debugger
                dispatch(receiveSearch(res.data.body.artists));
            }

            if (userType === "Client" && name === "") {
                let res = await axios.get(`${API}/clients`);
                debugger
                dispatch(receiveSearch(res.data.body.clients));
            }

            if (userType === "Artist") {
                let res = await axios.get(`${API}/artists` + routeExtension);
                debugger
                dispatch(receiveSearch(res.data.body.searched_artist));
            } else if (userType === "Client") {
                let res = await axios.get(`${API}/clients` + routeExtension);
                debugger
                dispatch(receiveSearch(res.data.body.searched_client));
            } 
            debugger
            dispatch(receiveUserType(userType));
            history.push("/results");
            
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <div className="searchContainer">
            <form onSubmit={handleSubmit} className="searchForm">
                <input type={"text"} value={name} placeholder={"Search for Roadies!"} onChange={(e) => setName(e.target.value)} id="searchInput"/>
                <select value={userType} required aria-required={"true"} onChange={(e)=> setUserType(e.target.value)} id="searchSelect">
                    <option disabled value="">Search By...</option>
                    <option value={"Artist"} >Artist</option>
                    <option value={"Client"}>Client</option>
                </select>
                <button id="searchButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Search;