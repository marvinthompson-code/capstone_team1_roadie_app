import React, { useState, useContext } from "react";
import { apiURL } from "../../util/apiURL";
import { receiveVenueSearch } from "./venueSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_CLIENT_ID, API_CLIENT_SECRET } from "./../../secrets";
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
      dispatch(receiveVenueSearch(null))
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
      let img = prefix + ".png";
      return (
        <a
          key={venue.id}
          type={"button"}
          href="#"

          onClick={(e) => {
            setAddress(`${address}${city}${state}${cc}${postalCode}`);
            setVenue(`${name}`);
            setSearchMessage(name);
          }}
          className={"venueItem list-group-item list-group-item-action"}
        >
          <div className={"venueNameDiv"}>
            <h2 className={"venueName"}>{name}</h2>
          </div>
          <div className={"venueImageDiv"}>
            <img src={img} alt={"venue"} className={"venueImage"} />
          </div>
          <div className={"venueAddressDiv"}>
            <h3 className={"venueAddress"}>{formattedAddress[0]}</h3>
            <h3 className={"venueAddress"}>{formattedAddress[1]}</h3>
          </div>
        </a>
      );
    });
    return (
      <div className="jumbotron text-center eventFormJumbo">
        <ul className={"venueList"}>
          {venues.length === 0 ? (
            <>
              <h1 className="display-4">Search for a Venue</h1>
              <p className="lead">Venue Search Results will populate below.</p>
            </>
          ) : (
            <>
              <h1 className="display-4">Select a Venue</h1>
              <p className="lead">
                Venue details will auto-populate after selection.
              </p>
              <hr className="my-4"></hr>
              <div className="list-group venueSearchResultsList">
                {venueResults}
              </div>
            </>
          )}
        </ul>
      </div>
    );
  };

  // loading
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="jumbotron text-center eventFormJumbo">
      <h4 className="display-4">Create an Event</h4>
      <p className="lead">Search for a venue and add event details below.</p>
      <div className={"venueForm"}>
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

      {/* <div className={"selectedVenueContainer"}> */}
      <div className="jumbotron text-center eventFormJumbo">
        <div
          className="card justify-self: center eventFormCard"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <div className="form-group">
              <h5 className="card-title">Selected Venue</h5>
              <p className="card-text">
                The venue information will be automatically added to the event
                details.
              </p>
              {/* <a href="#" className="card-link">
                Card link
                </a>
                <a href="#" className="card-link">
                Another link
              </a> */}
              <div className="col-sm-10">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="selectedVenue"
                  value={searchMessage}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="eventFormDiv">
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

      <div className={"SearchResultIndexContainer"}>{VenueSearchIndex()}</div>
    </div>
  );
};

export default EventForm;
