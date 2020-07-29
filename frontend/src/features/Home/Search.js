import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import { useHistory } from 'react-router-dom'
import { receiveSearch } from "../SearchResults/searchSlice";
import { receiveUserType } from "../user/userSlice";
import axios from 'axios'

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
            if (userType === "Artist") {
                let res = await axios.get(`${API}/artists` + routeExtension);
                dispatch(receiveSearch(res.data.body.artists));
            } else if (userType === "Client") {
                let res = await axios.get(`${API}/clients` + routeExtension);
                dispatch(receiveSearch(res.data.body.clients));
            }
            dispatch(receiveUserType(userType));
            history.push("/results");
            
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"text"} value={name} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
                <select value={userType} onChange={(e)=> setUserType(e.target.value)}>
                    <option disabled value="">Search By...</option>
                    <option value={"Artist"} >Artist</option>
                    <option value={"Client"}>Client</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Search;