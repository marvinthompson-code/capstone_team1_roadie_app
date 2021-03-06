import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { recieveClientEvents } from "./bookMeEventsSlice";
import Portfolio from "../Portfolio/Portfolio";
import { receiveClientInfo } from "../client/clientInfoSlice";
import { apiURL } from "../../util/apiURL";
import logo from "../images/FinalRoadieLogoblk.png";
import axios from "axios";
import "../../css/ArtistProfile.css";
import moment from "moment";

const ArtistProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [city, setCity] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const loading = useSelector((state) => state.loading);
  const [artistBookings, setArtistBookings] = useState([]);
  const history = useHistory();
  const [toggleEditBookings, setToggleEditBookings] = useState(false);

  const API = apiURL();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchArtistBookings = async (artist_id) => {
      let res = await axios.get(`${API}/artists/${artist_id}/bookings`);
    
      setArtistBookings(res.data.body.artistBookings);
    };
    fetchArtistBookings(match.params.id);
  }, []);

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

  useEffect(() => {
    const fetchClientInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let { single_client } = res.data.body;

      dispatch(receiveClientInfo({
        ...single_client,
        email: client.email
      }
        ));
    };
    if (client !== null) {
      fetchClientInfo(client.id);
    }
  }, [client]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editButton = () => {
    if (artist !== null && artist.id === match.params.id) {
      return (
        <button
          type="button"
          className="btn btn-primary editArtistProfile"
          data-toggle="modal"
          data-target='#editArtist'
        >
          Edit Profile
        </button>
      );
    }
  };

  const bookMeButton = () => {
    if (client !== null) {
      return (
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
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleClientEvents = async (id) => {
    let res = await axios.get(`${API}/events/${id}`);
    let { events } = res.data.body;
    dispatch(recieveClientEvents(events));
  };

  const artistBookingThumbs = artistBookings.map((booking) => {
    return (
      <div
        className={"eventThumb row"}
        key={booking.id}
        onClick={(e) =>
          history.push(`/event/${booking.event_id}/client/${booking.client_id}`)
        }
      >
        <div class="card eventCard col" style={{ width: "18rem" }}>
          <img
            src={logo}
            alt="roadieLogo"
            width="50"
            height="50"
            class="d-inline-block align-top"
            id="roadieLogo"
          />
          <div class="card-body eventListItemBody">
            <div className="eventHeading">
              <h5 class="card-title eventThumbCardText text-center">{booking.name}</h5>
              {/* {toggleEditEvents ? (
                <img
                  src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
                  alt="delete"
                  id="deleteBttn"
                  onClick={() => {
                    handleEventDelete(event.id);
                  }}
                />
              ) : null} */}
            </div>
            <div className={"venueDateContainer"}>
              <p class="card-text eventThumbCardText">{booking.venue}</p>
              <p class="card-text eventThumbCardText">
                {booking.date.slice(0, 10)}
              </p>
              <p class="card-text eventThumbCardText">{booking.address}</p>
              <p class="card-text eventThumbCardText">{booking.city}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <div
          className="row artistBanner align-items-center justify-content-center"
          id="artistBanner"
        >
          <div className={"col-sm-2"}>{bookMeButton()}</div>
          <div className="col-sm-6 text-center artistProfileHeader">
            <h2 className={"artistProfileName"}>{name}</h2>
          </div>
          <div className="col-sm-2">{editButton()}</div>
        </div>

        <div className="row portfolioDiv">
          <div className={"col"}>
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
                <label className="labelInfo">Bio:</label>
                <p className={"bioContent"}>{bio}</p>
              </div>
            </div>
            <div className="bookingsDisplayContainer">
              <h2>Upcoming shows!</h2>
              <div className={"eventUl"}>{artistBookingThumbs}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "relative", minHeight: "200px" }}
      >
        <div
          className="toast"
          id="toastBooking"
          style={{ position: "absolute", top: 0, right: 0, width: "300px" }}
          data-autohide={true}
          data-delay="5000"
        >
          <div className="toast-header">
            <img
              src={logo}
              className="rounded mr-2"
              alt="..."
              width="20"
              height="20"
            />
            <strong className="mr-auto">Roadie</strong>
            <small>{moment().calendar()}</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">You sent a booking request!</div>
        </div>
      </div>
    </>
  );
};

export default ArtistProfile;
