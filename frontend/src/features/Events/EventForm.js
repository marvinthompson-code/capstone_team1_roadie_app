import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import { toggleEventModalState } from "./eventModalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

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
  const history = useHistory();
  const isOpen = useSelector((state) => state.eventModal);
  const API = apiURL();
  const match = useRouteMatch();

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
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

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
        <form className="eventForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="eventFormInput"
            value={name}
            placeholder="Name of Event"
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <input
            type="text"
            className="eventFormInput"
            value={venue}
            placeholder="Venue"
            onChange={(e) => setVenue(e.currentTarget.value)}
            required
          />
          <input
            type="text"
            className="eventFormInput"
            value={date}
            placeholder="Date"
            onChange={(e) => setDate(e.currentTarget.value)}
            required
          />
          <input
            type="text"
            className="eventFormInput"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.currentTarget.value)}
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
          <button type="submit">Add Event</button>
        </form>
      </div>
    </Modal>
  );
};

export default EventForm;
