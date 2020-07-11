import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// import { AuthRoute, ProtectedRoute } from "./util/routesUtil";

const Search = () => {
    const [ genre, setGenre ] =  useState("")
    const [ name, setName ] = useState("")
    //
    //

    const [ current, setCurrent ] = useState(true)
    // initialized as true, true represents artist, false represents clients
    const history = useHistory()
    const API = apiURL()
    // const token = useSelector(state => state.token)
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (current) {
            let res = await axios.get(`${API}/artist/search/${name}`)
            debugger
            // get request artist
        } else {
            let res = await axios.get(`${API}/client/search/${name}`)
            debugger
            // get request client
        }
        
        history.push("/results")
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"text"} value={name} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
                <select>
                    <option disabled defaultValue selected>Search By...</option>
                    <option onChange={() => setCurrent(true)} required>Artist</option>
                    <option onChange={() => setCurrent(false)} required>Client</option>
                </select>
            </form>
        </div>
    )
}

export default Search;