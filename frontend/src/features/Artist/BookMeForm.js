import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import '../../css/BookMeModal.css'

const BookMeForm = () => {
  const [bio, setBio] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [numberContact, setNumberContact] = useState("");
  const [body, setBody] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const API = apiURL();
  const client = useSelector((state) => state.client);
  const clientEvents = useSelector((state) => state.bookMeEvents);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const bookingEvents = () => {
    return clientEvents.forEach((event) => {
      debugger;
      return (
        <option key={event.id} value={event.name}>
          <h1>{event.name}</h1>
        </option>
      );
    });
  };

  // useEffect(() => {
  //   const fetchClientInfo = async (id) => {
  //     let res = await axios.get(`${API}/clients/${id}`);
  //     let { single_client } = res.data.body;
  //     setNumberContact(single_client.contact_info);
  //     debugger;
  //   };
  //   fetchClientInfo(client.id);
  // }, []);

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
                <label for="Event" id="lableitem">Event</label>
                <div className="col-sm-4">
                  <select className="custom-select form-control roadieDropdown">
                    <option value="" disabled>
                      Select an event
                    </option>
                    {bookingEvents()}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="Bio" id="lableitem">Tell me about yourself: </label>
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
                <label for="Body" id="lableitem">Body</label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={body}
                  id="Body"
                  placeholder="Body.."
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="Contact_info" id="lableitem">Your Contact Info</label>
                <input
                  type="email"
                  className="form-control bookMeInput"
                  value={emailContact}
                  placeholder="Email Contact"
                  onChange={(e) => setEmailContact(e.currentTarget.value)}
                  required
                />
                <input
                  type="tel"
                  className="form-control bookMeInput"
                  value={numberContact}
                  placeholder="Phone number"
                  onChange={(e) => setNumberContact(e.currentTarget.value)}
                  required
                />
              </div>
              <button type="submit" className="bookMeButton btn-primary">
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
