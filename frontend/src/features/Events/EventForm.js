import React, { useState } from "react";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const EventForm = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const API = apiUrl();

  const handleSubmit = async () => {
    try {
      await
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
};

export default EventForm;
