import React, {useState, useEffect} from "react";
import axios from 'axios';
import {apiURL} from '../../util/apiURL';



const ArtistPortfolio = () =>{
    const [name, setName] = useState("");
    const [videos, setVideos] = useState([]);
    const [pictures, setPictures] = useState([]);

    const API = apiUrl();

    useEffect(() =>{
        const fetchArtist = async (id) =>{
            let res = await axios.get(`${API}/artists/${id}`);
            let {name} 
        }
    },[])

    return(
        <div className="artistPortfolioContainer">
            <div className="portfolioHeader">
                <img/>
                <button>Book Me!</button>
            </div>
            <div className="artistName">
            <h1>Artist Name</h1>
            </div>
            <div className="artistMediaContainer">
            <div className="artistAlbumDiv">
                <h2>Artist Album</h2>
                <button>Upload Picture</button>
            </div>
            <div className="artistVideoDiv">
                <h2>Artist Videos</h2>
                <button>Upload Picture</button>
            </div>
            </div>
        </div>
    )

}
export default ArtistPortfolio; 