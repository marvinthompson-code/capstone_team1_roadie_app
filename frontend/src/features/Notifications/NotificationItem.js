import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../css/NotificationItem.css";
import BookingRequestModal from "./BookingRequestModal";
import DeclineBookingRequestModal from "./DeclineBookingRequestModal";

const NotificationItem = ({ notification }) => {
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);

  const [isArtist, setIsArtist] = useState(null);
  const [clientID, setClientID] = useState("");
  const [artistID, setArtistID] = useState("");

  const toggleArtist = () => {
    if (notification.data.eventDetails) {
      setClientID(notification.data.client_id);
      setArtistID(artist.id);
      setIsArtist(true);
    } else if (notification.data.name) {
      // setClientID(client.id);
      // setArtistID(notification.data.artist_id);
      setIsArtist(false);
    }
  };

  useEffect(() => {
    toggleArtist();
  }, []);

  let {
    message,
    bio,
    body,
    email,
    number,
    eventDetails,
    name,
    selectedEvent,
  } = notification.data;

  return (
    <>
      {isArtist ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{message}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{bio}</h6>
            <p className="card-text">{body}</p>
            <ul>
              <h5>Event details:</h5>
              <li>
                <p className="card-text">Name: {eventDetails?.name}</p>
              </li>
              <li>
                <p className="card-text">Venue: {eventDetails?.venue}</p>
              </li>
              <li>
                <p className="card-text">Address: {eventDetails?.address}</p>
              </li>
              <li>
                <p className="card-text"> City: {eventDetails?.city}</p>
              </li>
              <li>
                <p className="card-text">Date: {eventDetails?.date}</p>
              </li>
            </ul>
            <h6 className="card-subtitle mb-2 text-muted">Contact Info:</h6>
            <p className="card-text">{number}</p>
            <p className="card-text">{email}</p>
          </div>
          <div className="buttonsDiv">
            <button
              type="button"
              class="btn btn-primary acceptBtn"
              data-toggle="modal"
              data-target="#bookingRequestModalCenter"
            >
              Accept
            </button>
            <button
              type="button"
              class="btn btn-primary declineBtn"
              data-toggle="modal"
              data-target="#declineBookingRequestModalCenter"
            >
              Decline
            </button>
            <div className="bookingRequestModalDiv container">
              <BookingRequestModal
                artist_id={artistID}
                client_id={clientID}
                event_id={selectedEvent}
              />
              <DeclineBookingRequestModal />
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{message}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Name: {name}</h6>
            <p className="card-text">{body}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationItem;
