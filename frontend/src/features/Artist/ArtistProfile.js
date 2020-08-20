import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { recieveClientEvents } from "./bookMeEventsSlice";
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
  const client = useSelector((state) => state.client);
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

  const handleClientEvents = async (id) => {
    let res = await axios.get(`${API}/events/${id}`);
    let { events } = res.data.body;
    dispatch(recieveClientEvents(events));
    dispatch(toggleBookMeModalState());
  };

  return (
    <div className="container">
      <div
        className="row artistBanner align-items-center justify-content-center"
        id="artistBanner"
      >
        <div className={"col-sm-2"}>
          <button
            type="button"
            id={"BookMeButton"}
            onClick={() => handleClientEvents(client.id)}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#bookMeModalCenter"
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
            <div className={"cityDiv"}>
              <label className="labelInfo">From:</label>
              <h4 className={"city"}>{city}</h4>
            </div>
            <div className={"contactInfoDiv"}>
              <label className="labelInfo">Contact:</label>
              <h4 className={"contact"}>{contactInfo}</h4>
            </div>
            <div className={"bioDiv"}>
              <label className="labelInfo">About me:</label>
              <p className={"bioContent"}>{bio}</p>
            </div>
          </div>
          <div className="bookingsDisplayContainer">
            <h2>Upcoming shows!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
