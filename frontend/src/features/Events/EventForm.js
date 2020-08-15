import React, { useState, useContext } from "react";
import { apiURL } from "../../util/apiURL";
import { receiveVenueSearch } from './venueSearchSlice'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
// import VenueSearchIndex from './VenueSearchIndex'
import {
  API_CLIENT_ID,
  API_CLIENT_SECRET
} from "./../../secrets"
import axios from "axios";
import "../../css/EventForm.css";

const EventForm = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);
  const venues = useSelector(state => state.venues)
  const API = apiURL();
  const history = useHistory()

  // post req for new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${API}/events/`, {
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
      history.push(`/client/${client.id}`)
    } catch (err) {
      console.log(err);
    }
  };

  // venue search
  const handleDate = (str) => {
    let str2 = str.split("-")
    let str3 = str2.join("")
    return str3
  }
  const handleVenueSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}&query=${venue}&limit=${5}&v=${handleDate(date)}&near=${city}`)
      dispatch(receiveVenueSearch(res.data.response.venues))
    } catch (error) {
      console.log(error)
    }
  }

  // venue mapping
  const VenueSearchIndex = () => {

    const colorChange = (location) => {
      return location.style = {
        backgroundColor: "white"
      }
    }
    const venueResults = venues.map((venue) => {
      let { name } = venue
      let { address, crossStreet, postalCode, cc, city, state } = venue.location
          let { prefix, suffix } = venue.categories[0].icon
          let img = prefix.concat(suffix).replace(/\s/g, '')
          return (
          <li key={venue.id} onClick={() => {
            // colorChange(this)
            setAddress(`${address}${city}${state}${cc}${postalCode}`)
            setVenue(`${name}`)
          }} className={"venueItem"} >
              <div className={"venueNameDiv"}>
                <h2 className={"venueName"}>{name}</h2>
                </div>
              <div className={"venueImageDiv"}>
                  <img src={img} alt={"venue"} className={"venueImage"}/>
              </div>
              <div className={"venueAddressDiv"}>
                  <h3 className={"venueAddress"}>{address}</h3>
                  <h3 className={"venueAddress"}>{city}</h3>
                  <h3 className={"venueAddress"}>{state}</h3>
                  <h3 className={"venueAddress"}>{cc}</h3>
                  <h3 className={"venueAddress"}>{postalCode}</h3>
              </div>
              <div className={"venueCrossStreetDiv"}><h2>{crossStreet}</h2></div>
          </li>
          )
    })
    return(
        <ul className={"venueList"}>
            {venues.length === 0? <h2 className={"noResults"}>Search for Venues!</h2> : venueResults}
        </ul>
    )
}

  // loading
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
      <div className="eventFormDiv">
        <h2 className="eventFormTitle">Create an Event</h2>
        <div className={"venueForm"}>
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
                placeholder="YYYYMMDD"
                onChange={(e) => setDate(e.target.value)}
                required
                />
              <button type={"submit"} className={"submit"}>Search</button>
            </form>
          </div>

            <div className={"SearchResultIndexContainer"}>
              {VenueSearchIndex()}
            </div>

        <form className="eventForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="eventFormInput"
            value={name}
            placeholder="Name of Event"
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <button type="submit" className={"eventSubmit"}>Add Event</button>
        </form>
      </div>
  );
};

export default EventForm;
