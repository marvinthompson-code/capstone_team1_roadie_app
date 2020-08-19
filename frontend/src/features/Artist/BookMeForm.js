import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookMeModalState } from "../Artist/bookMeModalSlice";
import Modal from "react-modal";

import axios from "axios";

const BookMeForm = () => {
  const [bio, setBio] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [numberContact, setNumberContact] = useState("");
  const [events, setEvents] = useState([]);

  const API = apiURL();
  const client = useSelector((state) => state.client);
  const isOpen = useSelector((state) => state.bookMeModal);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    dispatch(toggleBookMeModalState());
  };

  const handleClientEventSelect = async (id) => {
    let res = await axios.get(`${API}/events/${id}`);
    let { events } = res.data.body;
    setEvents(events);
  };

  const clientEvents = events.forEach((event) => {
    return <option key={event.id}>{event.name}</option>;
  });

  useEffect(() => {
    // handleClientEventSelect(client.id);
  }, []);

  return (
    <Modal isOpen={false} onRequestClose={closeModal} isOpen={isOpen}>
      <div>
        <h1>Book Me!</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="Event">Event</label>
            <div className="col-sm-4">
              <select className="custom-select form-control roadieDropdown">
                <option value="" disabled>
                  Select an event
                </option>
                {clientEvents}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="Bio">Tell me about yourself: </label>
            <input
              type="text"
              className="form-control"
              value={bio}
              id="Bio"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="Contact_info">Your Contact Info</label>
            <input
              type="email"
              className="form-control"
              value={emailContact}
              placeholder="Email Contact"
              onChange={(e) => setEmailContact(e.currentTarget.value)}
              required
            />
            <input
              type="tel"
              className="form-control"
              value={numberContact}
              placeholder="Phone number"
              onChange={(e) => setNumberContact(e.currentTarget.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Book
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BookMeForm;
