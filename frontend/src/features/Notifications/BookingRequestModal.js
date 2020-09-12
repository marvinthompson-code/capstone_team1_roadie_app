import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { db } from "../../firebase";
import "../../css/BookingRequestModal.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BookingRequestModal = ({
  artist_id,
  client_id,
  event_id,
  notification_id,
}) => {
  const API = apiURL();

  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API}/bookings`, {
        artist_id: artist_id,
        client_id: client_id,
        event_id: event_id,
        bio: bio,
        contact_info: formatPhoneNumber(contactInfo),
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
        <div className="modal-content BookingRequestModal">
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
            <form onSubmit={handleSubmit} class="form-horizontal">
              <div className="form-group">
                <label for="bookMeModalInput" id="labelitem1">
                  Upcoming show description:
                </label>
                <input
                  type="text"
                  className="form-control bookMeModalInput"
                  placeholder="Write a description for this upcoming show"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ backgroundColor: "black" }}
                />
              </div>
              <div className="form-group">
                <label for="bookMeModalInput" id="labelitem2">
                  Provide your number for the client:
                </label>
                <PhoneInput
                  className="form-control bookMeModalInput"
                  inputProps={{
                    name: "contact_info",
                    required: true,
                    autoFocus: true,
                  }}
                  country={"us"}
                  value={contactInfo}
                  onChange={(contact_info) => setContactInfo(contact_info)}
                />
              </div>

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
