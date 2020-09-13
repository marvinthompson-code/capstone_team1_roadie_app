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
        <div className="card notificationCard" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{message}</h5>
            <p className="card-text">{body}</p>
            <h6 className="card-subtitle mb-2 text-muted">{bio}</h6>
            <h5>Event details:</h5>
            <div className="cardTextInfo">
            <p className="card-text notiInfo"> <label for="notificationName" id="lableitem">Name:</label> {eventDetails?.name}</p>

            <p className="card-text notiInfo"><label for="notificationVenue" id="lableitem">Vanue:</label>{eventDetails?.venue}</p>

            <p className="card-text notiInfo"><label for="notificationAddress" id="lableitem">Address:</label>{eventDetails?.address}</p>

            <p className="card-text notiInfo"><label for="notificationCity" id="lableitem">City:</label>{eventDetails?.city}</p>

            <p className="card-text notiInfo"><label for="notificationDate" id="lableitem">Date:</label> {eventDetails?.date}</p>
            </div>
            <div className="notiContact">
            <h6 className="card-subtitle mb-2 text-muted">Contact Info:</h6>
            <p className="card-text">{number}</p>
            <p className="card-text">{email}</p>
            </div>
          </div>
          <div className="buttonsDiv">
            <button
              type="button"
              className="btn btn-primary acceptBtn"
              data-toggle="modal"
              data-target="#bookingRequestModalCenter"
            >
              Accept
            </button>
            <button
              type="button"
              className="btn btn-primary declineBtn"
              data-toggle="modal"
              data-target="#declineBookingRequestModalCenter"
            >
              Decline
            </button>

              <BookingRequestModal
                artist_id={artistID}
                client_id={clientID}
                event_id={selectedEvent}
                notification_id={notification.id}
              />
              <DeclineBookingRequestModal
                artist_id={artistID}
                notification_id={notification.id}
              />
      
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
