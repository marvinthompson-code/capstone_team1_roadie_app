import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import "../../css/BookMeModal.css";
import { db } from "../../firebase";
import $ from "jquery";

const BookMeForm = () => {
  const [bio, setBio] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [numberContact, setNumberContact] = useState("");
  const [body, setBody] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

  const API = apiURL();
  const client = useSelector((state) => state.client);
  const clientInfo = useSelector((state) => state.clientInfo);
  const dispatch = useDispatch();
  const clientEvents = useSelector((state) => state.bookMeEvents);
  const match = useRouteMatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection("bookings")
      .doc(match.params.id)
      .collection("messages")
      .add({
        client_id: client.id,
        bio: bio,
        email: emailContact,
        number: numberContact,
        message: "A client is trying to book you!",
        body: body,
        selectedEvent: selectedEvent,
        eventDetails: eventDetails,
      });
    // create alert that says "You sent a book request"
    // Toast?
    $("#toastBooking").toast("show");
    // close modal
  };

  useEffect(() => {
    if (client !== null) {
      debugger;
      setEmailContact(client.email);
    }
  }, []);

  const bookingEvents = () => {
    return clientEvents.map((event) => {
      return (
        <option
          key={event.id}
          value={event.id}
          onClick={(e) => setSelectedEvent(e.target.value)}
        >
          {event.name}
        </option>
      );
    });
  };

  const handleSelectedEvent = async (id) => {
    setSelectedEvent(id);
    let res = await axios.get(`${API}/events/${id}/${client.id}`);
    setEventDetails({
      name: res.data.body.event.name,
      venue: res.data.body.event.venue,
      city: res.data.body.event.city,
      address: res.data.body.event.address,
      date: res.data.body.event.date.slice(0, 10),
    });
  };

  const handleEventDetails = (obj) => {
    return (
      <>
        <label for="EventName" id="lableitemDetails">
          Event Name
        </label>
        <p className="card-text">{obj.name}</p>
        <label for="EventName" id="lableitemDetails">
          Venue
        </label>
        <p className="card-text">{obj.venue}</p>
        <label for="EventName" id="lableitemDetails">
          Location
        </label>
        <p className="card-text">{obj.city}</p>
        <p className="card-text">{obj.date}</p>
        <p className="card-text">{obj.address}</p>
      </>
    );
  };

  return (
    <div
      className="modal fade"
      id="bookMeModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bookMeHeader">
            <h1>Book Me!</h1>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body bookMeModalBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="Event" id="lableitem">
                  Event
                </label>
                <div className="col-sm-4">
                  <select
                    className="custom-select form-control roadieDropdown"
                    onChange={(e) => handleSelectedEvent(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select an event
                    </option>
                    {bookingEvents()}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="Bio" id="lableitem">
                  Tell me about yourself:
                </label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={bio}
                  id="Bio"
                  placeholder="Describe yourself!"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="Body" id="lableitem">
                  Body
                </label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={body}
                  id="Body"
                  placeholder="Body.."
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              <div className="card eventDetailsCard" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Event Details</h5>

                  <div>
                    <div className="card-text-div">
                      {eventDetails === null ? (
                        <p className="card-text">
                          Your event details will appear here
                        </p>
                      ) : (
                        handleEventDetails(eventDetails)
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label for="Contact_info" id="lableitem">
                  Your Contact Info
                </label>
                <input
                  type="email"
                  className="form-control bookMeInput"
                  value={emailContact}
                  placeholder={emailContact}
                  onChange={(e) => setEmailContact(e.currentTarget.value)}
                  required
                />
                <input
                  type="tel"
                  className="form-control bookMeInput"
                  value={numberContact}
                  placeholder={numberContact}
                  onChange={(e) => setNumberContact(e.currentTarget.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bookMeButton btn-primary"
                onClick={handleSubmit}
                data-dismiss="modal"
                aria-label="Close"
              >
                Book
              </button>
            </form>
          </div>
          <div className="modal-footer bookMeFooter">
            <button
              type="button"
              className="bookMeCloseButton btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMeForm;
