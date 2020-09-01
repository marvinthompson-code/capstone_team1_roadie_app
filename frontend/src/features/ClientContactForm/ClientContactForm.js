import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import { db } from "../../firebase";
import "../../css/ClientContactForm.css"

const ClientContactForm = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [contact_info, setContact_info] = useState("");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("");
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const API = apiURL();
  const match = useRouteMatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection("contactMessages")
      .doc(match.params.id)
      .collection("messages")
      .add({
        name: name,
        message: "An artist messaged you",
        body: body,
      });
    // create alert that says "You sent a message"
    // Toastify?
    // close modal
  };

  useEffect(() => {
    const fetchArtistInfo = async (id) => {
      let res = await axios.get(`${API}/artists/${id}`);
      setName(res.data.body.single_artist.name);
      setCity(res.data.body.single_artist.city);
      setContact_info(res.data.body.single_artist.contact_info);
    };

    const fetchClientInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      setName(res.data.body.single_client.name);
      setCity(res.data.body.single_client.city);
      setContact_info(res.data.body.single_client.contact_info);
    };

    if (artist) {
      fetchArtistInfo(artist.id);
    } else if (client) {
      fetchClientInfo(client.id);
    } else if (artist === null && client === null) {
      setName("Please input name...");
    }
  });

  useEffect(() => {
    const fetchClientName = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      setClientName(res.data.body.single_client.name);
    };
    fetchClientName(match.params.id);
  }, []);

  return (
    <div
      class="modal fade"
      id="contactClientModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content clientContact">
          <div class="modal-header clientContactHeader">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Contact {clientName}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body clientContactBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="contactNameInput" id="labelItem">Name</label>
                <input
                  type="text"
                  className="form-control contactModalInput"
                  id={"eexampleInputEmail1"}
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={name}
                />
              </div>
              <div className="form-group">
                <label for="contactBodyInput" id="labelItem">Message</label>
                <textarea
                  type="text"
                  className="form-control contactModalInput"
                  id={"exampleInputEmail1"}
                  type="textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={"Briefly tell me who you are!"}
                ></textarea>
              </div>

              <div className="form-group">
                <h3>{clientName}'s info</h3>
                <h4 className="lead">{contact_info}</h4>
                <h4 className="lead">{city}</h4>
              </div>

              <button
                type="submit"
                className="btn btn-primary contactModalButton"
                onClick={handleSubmit}
                data-dismiss="modal"
                aria-label="Close"
              >
                Send
              </button>
            </form>
          </div>
          <div class="modal-footer contactModalBodyFooter">
            <button
              type="button"
              class="btn btn-secondary contactModalCloseButton"
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

export default ClientContactForm;
