import React, { useState }from 'react';
import axios from 'axios';
import { updateArtist } from '../Artist/artistSlice'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiURL } from '../../util/apiURL';
import { signUp } from '../../util/firebaseFunctions'

const ArtistSignUpForm = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("")
    const [ city, setCity ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ profilePicUrl, setProfilePicUrl ] = useState("")
    const [ genre, setGenre ] = useState("");
    const [ bio, setBio ] = useState("");
    const [ pricing, setPricing ] = useState("");
    const [ contact, setContact ] = useState("");

    const API = apiURL();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await signUp(email, password);
            debugger
            console.log("Show Artist", res);
            let res2 = await axios.post(`${API}/artists/`, {
                id: res.user.uid,
                name,
                profilePicUrl,
                bio,
                pricing,
                genre,
                city,
                contact
            })
            debugger
            dispatch(updateArtist(res.user));
            // history.push("/") to feed or artist profile, depends on what we want to do
        } catch (error) {
            console.log(error.message);
        }
        debugger
    }

    return (
        <div className={"FormContainer"}>
            <h3>Artist Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <input type={"text"} placeholder={"email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)} required></input>
                <input type={"password"} placeholder={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"Band Name"} value={name} onChange={(e) => setName(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"genre"} value={genre} onChange={(e) => setGenre(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"contact"} value={contact} onChange={(e) => setContact(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"bio"} value={bio} onChange={(e) => setBio(e.currentTarget.value)}></input>
                <input type={"text"} placeholder={"city"} value={city} onChange={(e) => setCity(e.currentTarget.value)}></input>
                {/* Set Range: */}
                {/* <select>
                    <option value={"$"}>$</option>
                    <option value={"$$"}>$$</option>
                    <option value={"$$$"}>$$$</option>
                    <option value={"Ask"}>Ask</option>
                </select> */}
                <h4>Upload Image</h4>
                <button onClick={(e) => setProfilePicUrl(e.currentTarget.value)}>Upload</button>
                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    )
}

export default ArtistSignUpForm;