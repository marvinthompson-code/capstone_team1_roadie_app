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
        debugger
        try{
            let res = await axios.get(`${API}/artists/${id}`);
            setUserInfo(res.data.body.single_artist);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() =>{
        debugger
        getUser(match.params.artist_id);

    },[])

    return (
        <div className="container-fluid position-absolute userAlbums">
          <div className="row justify-content-center">
            <h2 id="usersAlbumHeader">{userInfo.name}'s Album</h2>
          </div>
          {/* <div className="jumbotron albumJumbo text-center">
            <ul className="allPhotos">{getUsersPictures}</ul>
          </div> */}
        </div>
      );
    
};
export default ArtistVideoAlbum;
