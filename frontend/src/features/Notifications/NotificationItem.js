import React from "react";

const NotificationItem = ({ notification }) => {
  let { message, bio, body, email, number, eventDetails } = notification.data;
  return (
      <div className="card" style={{width: "18rem"}}>
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
      </div>
  );
};

export default NotificationItem;
