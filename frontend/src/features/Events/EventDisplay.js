import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/EventDisplay.css"

const EventDisplay = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const API = apiURL();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchEventInfo = async (id, client_id) => {
      let res = await axios.get(`${API}/events/${id}/${client_id}`);
      debugger
      let { name, venue, date, city, address } = res.data.body.event;
      setName(name);
      setVenue(venue);
      setDate(date);
      setCity(city);
      setAddress(address);

    };
    fetchEventInfo(match.params.id, match.params.client_id);
  }, []);

  return (
    <div className="eventDisplay container">
      <div class="jumbotron text-center eventJumbo">
        <h1 class="display-4 jumbotronTitle">{name}</h1>
        <p class="lead pTagHeader">{venue}</p>
        <hr class="my-4"></hr>
        <div className={"venueDateContainer"}>
          <p id={"date"}>{date}</p>
          <p id={"address"}>{address}</p>
          <p id={"city"} >{city}</p>
        </div>
        <div>
          <h1 class="display-4 jumbotronTitle">Lineup</h1>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
