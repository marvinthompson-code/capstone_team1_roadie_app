import React, { useState }from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { apiURL } from '../../util/apiURL';
// import { signUp } from '../../util/firebaseFunctions'
// import { useDispatch } from 'react-redux'

const ArtistSignUpForm = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ genre, setGenre ] = useState("");
    const [ bio, setBio ] = useState("");
    const [ pricing, setPricing ] = useState("");
    const [ contact, setContact ] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    // const optionsArr = [
    //     {
    //         range: "$"
    //     },
    //     {
    //         range: "$$"
    //     },
    //     {
    //         range: "$$$"
    //     },
    //     {
    //         range: "Ask"
    //     }
    // ]

    // const options = optionsArr.forEach(price => {
    // return <option>{price.range}</option>
    // })
    const handleSubmit = (e) => {
        e.preventDefault()
        debugger
    }

    return (
        <div className={"FormContainer"}>
            <h2>Artist Sign Up</h2>
            <form onSubmit={handleSubmit}>

                <input type={"text"} placeholder={"email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"Band Name"} value={name} onChange={(e) => setName(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"genre"} value={genre} onChange={(e) => setGenre(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"contact"} value={contact} onChange={(e) => setContact(e.currentTarget.value)} required></input>
                <input type={"text"} placeholder={"bio"} value={bio} onChange={(e) => setBio(e.currentTarget.value)}></input>
                Set Range:
                <select>
                    <option value={"$"}>$</option>
                    <option value={"$$"}>$$</option>
                    <option value={"$$$"}>$$$</option>
                    <option value={"Ask"}>Ask</option>
                </select>
                <h3>Upload Image</h3>
                <button>Upload</button>

                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    )
}

export default ArtistSignUpForm;