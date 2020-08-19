import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Portfolio from "../Portfolio/Portfolio";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import { toggleBookMeModalState } from "./bookMeModalSlice";
import { toggleEditArtistProfileModalState } from "./editArtistProfileModalSlice";
import "../../css/ArtistProfile.css";

const ArtistProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [city, setCity] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const artist = useSelector((state) => state.artist);
  const [toggleEditBookings, setToggleEditBookings] = useState(false);

  const API = apiURL();
  const match = useRouteMatch();
  const dispatch = useDispatch();

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
    <div className="container">
      <div
        className="row artistBanner align-items-center justify-content-center"
        id="artistBanner"
      >
        <div className={"col-sm-2"}>
          <button
            id={"BookMeButton"}
            onClick={() => dispatch(toggleBookMeModalState())}
          >
            Book Me!
          </button>
        </div>
        <div className="col-sm-6 text-center artistProfileHeader">
          <h2 className={"artistProfileName"}>{name}</h2>
        </div>
        <div className="col-sm-2">{editButton()}</div>
      </div>

      {/* This page has two divs */}

      <div className="row portfolioDiv">
        <div className={"col-lg-2"}>
          <Portfolio />
        </div>
        <div className="col artistInfo">
          <div className={"infoDiv jumbotron"}>
            <div className={"CityDiv"}>
              <label>City:</label>
              <h3 className={"city"}>{city}</h3>
            </div>
            <div className={"ContactInfoDiv"}>
              <label>Contact:</label>
              <h3 className={"contact"}>{contactInfo}</h3>
            </div>
            <div className={"BioDiv"}>
              <h4 className={"aboutMe"}>About me:</h4>
              <p className={"bio"}>{bio}</p>
            </div>
          </div>
            <div className="bookingsDisplayContainer">
              {/* <BookMeForm /> */}
              <h2>Upcoming shows!</h2>
            </div>
      </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
