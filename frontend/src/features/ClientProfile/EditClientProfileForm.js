import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const EditClientProfileForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");

  const match = useRouteMatch();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update client information
    debugger;
    let res = await axios.patch(`${API}/clients/${match.params.id}`);
  };

  useEffect(() => {
    const fetchClientInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let {
        name,
        profile_pic_url,
        bio,
        city,
        contact_info,
      } = res.data.body.single_client;
      setName(name);
      setBio(bio);
      setContactInfo(contact_info);
    };
    fetchClientInfo(match.params.id);
  }, []);
  return (
    <div
      class="modal fade"
      id="editClientProfileModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bookMeHeader">
            <h1>Edit Profile</h1>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bookMeModalBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="Name" id="lableitem">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={name}
                  id="Name"
                  placeholder={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="form-group">
                <label for="Bio" id="lableitem">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={bio}
                  id="Bio"
                  placeholder={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="Contact_info" id="lableitem">
                  Contact Info
                </label>
                <input
                  type="text"
                  className="form-control bookMeInput"
                  value={contact_info}
                  id="Contact_info"
                  placeholder={contact_info}
                  onChange={(e) => setContactInfo(e.currentTarget.value)}
                />
              </div>
              <button type="submit" className="btn btn-info">
                Update
              </button>
            </form>
          </div>
          <div class="modal-footer bookMeFooter">
            <button
              type="button"
              class="bookMeCloseButton btn-secondary"
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

export default EditClientProfileForm;
