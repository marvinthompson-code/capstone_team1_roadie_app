import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventDisplay from "../Events/EventDisplay";
import { toggleEventModalState } from "../Events/eventModalSlice";
import { toggleEventDisplayState } from "../Events/eventDisplaySlice";
import { toggleEditClientProfileModalState } from "./editClientProfileModalSlice";
import { toggleClientContactModalState } from "../ClientContactForm/clientContactModalSlice";
import axios from "axios";
import Modal from "react-modal";
import { useHistory, useRouteMatch } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import "../../css/ClientProfile.css";

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

  // const displayEventModal = (id, client_id) => {
  //   dispatch(toggleEventDisplayState())
  //   return  <EventDisplay id={id} client_id={client_id} isOpen={isOpen} />
  // }

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

  let editButton = () => {
    if (client !== null && client.id === match.params.id) {
      return (
        <button
          id={"EditClientProfileButton"}
          onClick={() => dispatch(toggleEditClientProfileModalState())}
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
            onClick={() => dispatch(toggleEventModalState())}
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
    <div>
      <div className={"ProfilePictureDiv"}>
        <img
          src={profilePicUrl}
          alt={"Client Profile"}
          className={"profilePicture"}
        />
      </div>

      <div className={"buttonsDiv"}>
        <button
          id={"ContactMeButton"}
          onClick={() => dispatch(toggleClientContactModalState())}
        >
          Contact Me!
        </button>
        {editButton()}
      </div>

      <div className={"ClientNameDiv"}>
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

        <div className={"eventDiv"}>
          <div className={"eventTitleDiv"}>
            <h3 className={"eventsTitle"}>Created Events</h3>
          </div>
          <ul className={"eventUl"}>{userEventsThumbs}</ul>

          <div className={"createEventButtonDiv"}>{createEventButton()}</div>
        </div>
        <div className={"portfolioSection"}></div>
      </div>
    </div>
  );
};

export default ClientProfile;
