import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import { toggleBookMeModalState } from "./bookMeModalSlice"
import { toggleEditArtistProfileModalState } from "./editArtistProfileModalSlice"
import '../../css/ArtistProfile.css'

const ArtistProfile = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [city, setCity] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const artist = useSelector((state) => state.artist);
    const [toggleEditBookings, setToggleEditBookings] = useState(false);

    // const history = useHistory()
    const API = apiURL()
    const match =  useRouteMatch()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserInfo = async (id) => {
          let res = await axios.get(`${API}/artists/${id}`);
          let {
            name,
            profile_pic_url,
            bio,
            city,
            contact_info,
          } = res.data.body.single_artist;
          setName(name);
          setProfilePicUrl(profile_pic_url);
          setBio(bio);
          setCity(city);
          setContactInfo(contact_info);
        };
        fetchUserInfo(match.params.id);
    }, []);
      
    
    //   const handleToggle = () => {
    //     toggleEditBookings ? setToggleEditBookings(false) : setToggleEditBookings(true);
    //   };


      let editButton = () => {
        if (artist !== null && artist.id === match.params.id) {
          return (
            <button
              id={"EditArtistProfileButton"}
              onClick={() => dispatch(toggleEditArtistProfileModalState())}
            >
              Edit Profile
            </button>
          );
        }
      };

    return (
        <div>
          <div className={"ProfilePictureDiv"}>
            <img
              src={profilePicUrl}
              alt={"Artist Profile"}
              className={"profilePicture"}
            />
          </div>

          <div className={"buttonsDiv"}>
            <button
              id={"BookMeButton"}
              onClick={() => dispatch(toggleBookMeModalState())}
            >
            Book Me!
            </button>
            {editButton()}
          </div>

          <div className={"ArtistNameDiv"}>
            <h2 className={"name"}>{name}</h2>
          </div>
          <div className={"InfoDiv"}>
            <div className={"CityDiv"}>
              <label>City:</label>
                <h3 className={"city"}>{city}</h3>
            </div>

            <div className={"ContactInfoDiv"}>
              <label>Contact:</label>
              <h3 className={"contact"}>{contactInfo}</h3>
            </div>
          </div>
          <div className={"BioPortfolioContainer"}>
            <div className={"BioDiv"}>
              <h4 className={"aboutMe"}>About me:</h4>
              <h3 className={"bio"}>{bio}</h3>
            </div>

            {/* <div className={"eventDiv"}>
              <div className={"eventTitleDiv"}>
                <h3 className={"eventsTitle"}>Created Events</h3>
              </div>
              <ul className={"eventUl"}>{userEventsThumbs}</ul>

              <div className={"createEventButtonDiv"}>{createEventButton()}</div>
            </div> */}
          
            <div className={"portfolioSection"}></div>
          </div>
          
        </div>
    )
}

export default ArtistProfile;