import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleClientContactModalState } from "../ClientContactForm/clientContactModalSlice";
import ClientPortfolio from "../Portfolio/ClientPortfolio";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import { apiURL } from "../../util/apiURL";

const ClientProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [city, setCity] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const [toggleEditEvents, setToggleEditEvents] = useState(false);
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const API = apiURL();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.EventDisplay);
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let {
        name,
        profile_pic_url,
        bio,
        city,
        contact_info,
      } = res.data.body.single_client;
      setName(name);
      setProfilePicUrl(profile_pic_url);
      setBio(bio);
      setCity(city);
      setContactInfo(contact_info);
    };
    fetchUserInfo(match.params.id);
  }, []);

  useEffect(() => {
    const fetchUserEvents = async (id) => {
      let res = await axios.get(`${API}/events/${id}`);
      setUserEvents(res.data.body.events);
    };
    fetchUserEvents(match.params.id);
  }, [userEvents]);

  const handleEventDelete = async (id) => {
    try {
      await axios.delete(`${API}/events/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    toggleEditEvents ? setToggleEditEvents(false) : setToggleEditEvents(true);
  };

  const userEventsThumbs = userEvents.map((event) => {
    return (
      <div className="singleEventContainer" key={event.id}>
        <li id={event.id} className={"eventThumb"} key={event.id}>
          <div className="eventHeading">
            <h2 className={"eventName"}>{event.name}</h2>
            {toggleEditEvents ? (
              <img
                src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
                alt="delete"
                id="deleteBttn"
                onClick={() => {
                  handleEventDelete(event.id);
                }}
              />
            ) : null}
          </div>
          <div className={"venueDateContainer"}>
            <h3 id={"venue"}>{event.venue}</h3>
            <h3 id={"date"}>{event.date.slice(0, 10)}</h3>
            <h3 id={"address"}>{event.address}</h3>
            <h3 id={"city"}>{event.city}</h3>
          </div>
        </li>
      </div>
    );
  });

  //   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  //   Launch demo modal
  // </button>

  let editButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#editClientProfileModalCenter"
        >
          Edit Profile
        </button>
      );
    }
  };

  let createEventButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <div className="eventsButtonsDiv">
          <button
            id={"CreateEventButton"}
            onClick={() =>
              history.push(`/client/${match.params.id}/createEvent`)
            }
          >
            Create Event
          </button>
          <button id={"CreateEventButton"} onClick={handleToggle}>
            Edit Events
          </button>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="row artistBanner align-items-center justify-content-center"
        id="artistBanner"
      >
        <div className={"col-sm-2"}>
          <button
            id={"BookMeButton"}
            onClick={() => dispatch(toggleClientContactModalState())}
          >
            Contact Me!
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
          <ClientPortfolio />
        </div>

        <div className="col artistInfo">
          <div className={"infoDiv jumbotron"}>
            <div className={"cityDiv"}>
              <label className="labelInfo">City:</label>
              <h4 className={"city"}>{city}</h4>
            </div>
            <div className={"contactInfoDiv"}>
              <label className="labelInfo">Contact:</label>
              <h3 className={"contact"}>{contactInfo}</h3>
            </div>
            <div className={"bioDiv"}>
              <label className="labelInfo">About me:</label>
              <p className={"bioContent"}>{bio}</p>
            </div>
          </div>

          <div className={"bookingsDisplayContainer"}>
            <div className={"eventTitleDiv"}>
              <h3 className={"eventsTitle"}>Created Events</h3>
            </div>
            <ul className={"eventUl"}>{userEventsThumbs}</ul>

            <div className={"createEventButtonDiv"}>{createEventButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
