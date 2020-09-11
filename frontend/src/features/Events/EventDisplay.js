import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/EventDisplay.css";
import logo from "../images/FinalRoadieLogoblk.png";
import { PEXELS_API_KEY } from "../../secrets";
import LineupItem from "./LineupItem";

const EventDisplay = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [lineupArr, setLineupArr] = useState([]);
  const API = apiURL();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchEventInfo = async (id, client_id) => {
      let res = await axios.get(`${API}/events/${id}/${client_id}`);
      let { name, venue, date, city, address } = res.data.body.event;
      setName(name);
      setVenue(venue);
      setDate(date);
      setCity(city);
      setAddress(address);

      const fetchImage = async (city) => {
        let res = await axios.get(
          `https://api.pexels.com/v1/search?query=${city}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );
        setBackgroundImage(res.data.photos[0].url);
      };
      fetchImage(city);
    };
    fetchEventInfo(match.params.id, match.params.client_id);
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchLineupInfo = async (id) => {
      let res = await axios.get(`${API}/lineup/${id}`);
      debugger;
      setLineupArr(res.data.body.lineup);
    };
    fetchLineupInfo(match.params.id);
  }, []);

  const lineupCards = lineupArr.map((artist) => {
    return (
      <div className={"col"}>
        <LineupItem artist={artist} />
      </div>
    );
  });

  return (
    <div className="eventDisplay container">
      <div class="jumbotron text-center eventJumbo">
        <img
          src={logo}
          alt="roadieLogo"
          width="100"
          height="100"
          class="d-inline-block align-top"
          id="roadieLogo"
        />

        <h1 class="display-4 jumbotronTitle">{name}</h1>
        <p class="lead pTagHeader">{venue}</p>
        <p id={"address"} className="lead">
          {address}
        </p>
        <p id={"date"} className="lead">
          {date}
        </p>
        <p id={"city"} className="lead">
          {city}
        </p>
        {/* <hr class="my-4"/> */}
        <div className="container">
          <h1 className={"display-4"}>Lineup</h1>
          <div className={"row"}>
            {lineupCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
