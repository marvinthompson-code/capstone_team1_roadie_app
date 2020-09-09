import React, { useState, useContext } from "react";
import { apiURL } from "../../util/apiURL";
import { receiveVenueSearch } from "./venueSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_CLIENT_ID, API_CLIENT_SECRET } from "./../../secrets";
import axios from "axios";
import logo from "../images/FinalRoadieLogoblk.png";
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
  const venues = useSelector((state) => state.venues);
  const API = apiURL();
  const [searchMessage, setSearchMessage] = useState("");
  const history = useHistory();

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
      setName("");
      setVenue("");
      setDate("");
      setAddress("");
      setCity("");
      // dispatch(receiveVenueSearch(null))
      history.push(`/client/${client.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // venue search
  const handleDate = (str) => {
    let str2 = str.split("-");
    let str3 = str2.join("");
    return str3;
  };

  const handleVenueSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(
        `https://api.foursquare.com/v2/venues/search?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}&query=${venue}&limit=${5}&v=${handleDate(
          date
        )}&near=${city}`
      );
      dispatch(receiveVenueSearch(res.data.response.venues));
    } catch (error) {
      console.log(error);
    }
  };

  // venue mapping
  const VenueSearchIndex = () => {
    const venueResults = venues.map((venue) => {
      let { name } = venue;
      let {
        address,
        postalCode,
        cc,
        city,
        state,
        formattedAddress,
      } = venue.location;
      let { prefix } = venue.categories[0].icon;
      let img = `${prefix}.png`;
      return (
        <a
          key={venue.id}
          type={"button"}
          href="#"
          onClick={(e) => {
            setAddress(formattedAddress[0] + ' ' + formattedAddress[1]);
            setVenue(`${name}`);
            setSearchMessage(name);
          }}
          className={"venueItem list-group-item list-group-item-action"}
        >
          <div className={"venueNameDiv"}>
            <img
              src={logo}
              alt="roadieLogo"
              width="50"
              height="50"
              class="d-inline-block align-top"
              id="roadieLogo"
            />
            <p className={"venueName lead"}>{name}</p>
          </div>
          <div className={"venueAddressDiv"}>
            <p className={"venueAddress"}>{formattedAddress[0]}</p>
            <p className={"venueAddress"}>{formattedAddress[1]}</p>
          </div>
        </a>
      );
    });

    return (
      <div className="jumbotron-fluid text-center">
        {venues.length === 0 ? (
          <>
            <p className="lead">Try searching for a venue!</p>
          </>
        ) : (
          <>
            <div className="list-group venueSearchResultsList">
              {venueResults}
            </div>
          </>
        )}
      </div>
    );
  };

  // loading
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className="jumbotron text-center eventFormJumbo row">
        <div className="container">
          <h4 className="display-4">Create an Event</h4>
          <p className="lead">
            Search for a venue and add event details below.{" "}
          </p>
        </div>
        <br></br>
        <div className={"venueForm col"}>
          <h1 className="lead">Search for a Venue</h1>
          <form onSubmit={handleVenueSubmit}>
            <div className="form-group">
              <label for="exampleInputVenue">Venue</label>
              <input
                type="text"
                className="form-control"
                value={venue}
                id="exampleInputVenue"
                placeholder="Search Venues..."
                onChange={(e) => setVenue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputCity">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                id="exampleInputCity"
                placeholder="City"
                onChange={(e) => setCity(e.currentTarget.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputCity">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                id="exampleInputDate"
                placeholder="YYYYMMDD"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary eventFormSearchButton"
            >
              Search
            </button>
          </form>
        </div>
        <div className={"container col venueSearchResultsDiv"}>
          {VenueSearchIndex()}
        </div>
        <div
          className="card justify-self: center eventFormCard selectedVenueCard col"
          style={{ width: "18rem" }}
        >
          <div className="card-body selectedVenueCardBody">
            <img
              src={logo}
              alt="roadieLogo"
              width="50"
              height="50"
              class="d-inline-block align-top"
              id="roadieLogo"
            />
            <div className="form-group">
              <h5 className="card-title">Selected Venue</h5>
              <p className="card-text">
                The venue information will be automatically added to the event
                details.
              </p>
              <div className="col-sm-10 text-center">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext selectedVenueText lead"
                  id="selectedVenue"
                  value={searchMessage}
                />
              </div>
              <div className="col-sm-10 text-center">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext selectedVenueText"
                  id="selectedVenue"
                  value={address}
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="eventFormDiv container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputName">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                id="exampleInputName"
                placeholder="Name of Event"
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary eventFormSubmitButton"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
