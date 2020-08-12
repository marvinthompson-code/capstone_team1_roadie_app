import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import { toggleEventModalState } from "./eventModalSlice";
import { receiveSearch } from '../SearchResults/searchSlice'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import VenueSearchIndex from './VenueSearchIndex'

import axios from "axios";
import Modal from "react-modal";
import "../../css/EventForm.css";

const EventForm = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);
  const searchResults = useSelector((state) => state.search)
  const history = useHistory();
  const isOpen = useSelector((state) => state.eventModal);
  const API = apiURL();
  const match = useRouteMatch();

  const {
    API_CLIENT_ID,
    API_CLIENT_SECRET
  } = process.env

  const closeModal = () => {
    dispatch(toggleEventModalState());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API}/events/`, {
        name,
        venue,
        date,
        address,
        city,
        client_id: client.id,
      });
      setName("")
      setVenue("")
      setDate("")
      setAddress("")
      setCity("")
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleVenueSubmit = async (e) => {
    e.preventDefault()
    try {
      setDate(formatDate(date))
      let res = await axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}&query=${venue}&limit=${25}&v=${date}&near=${city}`)
      debugger
      dispatch(receiveSearch())
    } catch (error) {
      console.log(error)
    }
  }

  const formatDate = (date) => {
    let newDate = date.split("").reverse().join("")
    return newDate.split("-").join("")
  }

  return (
    <Modal
      isOpen={false}
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={{
        content: {
          backgroundColor: "#F4D8CD",
          borderRadius: "13px",
          left: "25%",
          right: "25%",
        },
      }}
    >
      <div className="eventFormDiv">
        <h2 className="eventFormTitle">Create an Event</h2>
        <form className="eventForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="eventFormInput"
            value={name}
            placeholder="Name of Event"
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <div>

            <form onSubmit={handleVenueSubmit}>
              <input
                type="text"
                className="eventFormInput"
                value={venue}
                placeholder="Search Venues..."
                onChange={(e) => setVenue(e.currentTarget.value)}
                required
                />
              <input
                type="text"
                className="eventFormInput"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.currentTarget.value)}
                required
                />
                 <input
                type="date"
                className="eventFormInput"
                value={date}
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                required
          />
              <button type={"submit"} className={"submit"}>Search</button>
            </form>
          </div>
            <div className={"SearchResultIndexContainer"}>
              <VenueSearchIndex venues={searchResults}/>
            </div>
          <input
            type="text"
            className="eventFormInput"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.currentTarget.value)}
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </Modal>
  );
};

export default EventForm;
