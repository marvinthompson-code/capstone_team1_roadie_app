import React, {useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";
import axios from "axios";
import {apiURL} from "../../util/apiURL";


const ArtistVideoAlbum = () =>{
    const [videos, setVideos] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const API = apiURL();
    const match = useRouteMatch();

    const getUser = async (id) =>{
        let res = await axios.get(`${API}/artist/${id}`)
    }
    
}
