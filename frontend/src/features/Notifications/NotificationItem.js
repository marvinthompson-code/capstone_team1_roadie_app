import React, { useState, useEffect } from "react";

const NotificationItem = ({ notification }) => {
  const [isArtist, setIsArtist] = useState(null);

  const toggleArtist = () => {
    if (notification.data.eventDetails) {
      setIsArtist(true);
    } else if (notification.data.name) {
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
          <div className="buttons">
            <button>Accept</button>
            <button>Decline</button>
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
