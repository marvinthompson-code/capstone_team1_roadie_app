import React, {useState, useEffect} from "react";
import axios from 'axios';
import {apiURL} from '../../util/apiURL';
import {useRouteMatch} from 'react-router-dom';


const ArtistPortfolio = () =>{
    const [name, setName] = useState("");
    const [videos, setVideos] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [profilePic, setProfilePic] = useState("");


    const API = apiURL();
    const match = useRouteMatch()

    useEffect(() =>{
        const fetchArtist = async (id) =>{
            let res = await axios.get(`${API}/artists/${id}`);
            let {name, profile_pic_url} = res.data.body.single_artist;
            setName(name);
            setProfilePic(profile_pic_url);
        };
        const fetchArtistPictures = async (id) =>{
            let res = await axios.get(`${API}/media/artists/${id}/pictures`);
            let {picture} = res.data.body.picture;
            setPictures(picture);
        };
        const fetchArtistVideos = async (id) =>{
            let res = await axios.get(`${API}/media/artists/${id}/videos`);
            let {video} = res.data.body.video;
            setVideos(video);
        };
        fetchArtist(match.params.id);
        fetchArtistPictures(match.params.id);
        fetchArtistVideos(match.params.id)

    },[])

    return(
        <div className="artistPortfolioContainer">
            <div className="portfolioHeader">
                <img src={profilePic}/>
                <button>Book Me!</button>
            </div>
            <div className="artistName">
            <h1>{name}</h1>
            </div>
            <div className="artistMediaContainer">
            <div className="artistAlbumDiv">
                <h2>{name}'s Album</h2>
                <button>Upload Picture</button>
            </div>
            <div className="artistVideoDiv">
                <h2>{name}'s Videos</h2>
                <button>Upload Picture</button>
            </div>
            </div>
        </div>
    )

}
export default ArtistPortfolio; 