import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { db } from "../../firebase";

const BookingRequestModal = ({
  artist_id,
  client_id,
  event_id,
  notification_id,
}) => {
  const API = apiURL();

  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API}/bookings`, {
        artist_id: artist_id,
        client_id: client_id,
        event_id: event_id,
        bio: bio,
        contact_info: contactInfo,
      });
      let res2 = await axios.post(`${API}/lineup/`, {
        event_id: event_id,
        artist_id: artist_id,
      });
      await db
        .collection("bookings")
        .doc(artist_id)
        .collection("messages")
        .doc(notification_id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="bookingRequestModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bookingRequestModalHeader">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Accept Book Request
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body bookingRequestModalBody">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Write a description for this upcoming show"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ backgroundColor: "black" }}
              />
              <input
                type="text"
                placeholder="Contact info for client"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                style={{ backgroundColor: "black" }}
              />
              <input
                type="submit"
                className="btn btn-primary activeButton"
                name="Click Here"
                value="Accept"
              />
            </form>
          </div>
          <div className="modal-footer bookingRequestModalBody">
            <button
              type="button"
              className="btn btn-secondary bookingRequestModalCloseButton"
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

export default BookingRequestModal;
