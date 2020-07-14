import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// import { AuthRoute, ProtectedRoute } from "./util/routesUtil";

const Search = () => {
    const [ genre, setGenre ] =  useState("")
    const [ name, setName ] = useState("")
    const [ toggle, setToggle] = useState(false)
    // initialized as true, true represents artist, false represents clients
    const history = useHistory()
    const API = apiURL()
    // const token = useSelector(state => state.token)
    
    const handleChange = (value) => {
        debugger
        if (value === "Artist") {
            setToggle(true)
            console.log()
        } else {
            setToggle(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
            if (toggle) {
                debugger
                try {
                    let res = await axios.get(`${API}/artists/search/${name}`)
                debugger
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    let res = await axios.get(`${API}/clients/search/${name}`)
                    debugger
                } catch (error) {
                    console.log(error)
                }
            }
        debugger
        
        history.push("/results")
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"text"} value={name} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
                <select onChange={(e)=> handleChange(e.target.value)}>
                    <option disabled defaultValue selected>Search By...</option>
                    <option value={"Artist"} >Artist</option>
                    <option value={"Client"}>Client</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Search;