import React, { useState, useEffect } from "react";
import { toggleLoadingState } from "../Loading/loadingSlice";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import '../../css/EditClientProfileForm.css'

const EditClientProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const match = useRouteMatch();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`${API}/clients/info/${match.params.id}`, {
      name,
      bio,
      contact_info,
    });
    dispatch(toggleLoadingState());
    dispatch(toggleLoadingState());
  };

  useEffect(() => {
    const fetchClientInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let { name, bio, contact_info } = res.data.body.single_client;
      setName(name);
      setBio(bio);
      setContactInfo(contact_info);
    };
    fetchClientInfo(match.params.id);
  }, []);

  const handleClick = () => {
    setToggle(true);
  };

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
          <div class="modal-header editClientProfileHeader">
            <h3 className="modal-title" id="exampleModalLongTitle">Edit Profile</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body editClientProfileBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="Name" id="lableitem">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control editClientProfileInput"
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
                  className="form-control editClientProfileInput"
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
                  className="form-control editClientProfileInput"
                  value={contact_info}
                  id="Contact_info"
                  placeholder={contact_info}
                  onChange={(e) => setContactInfo(e.currentTarget.value)}
                />
              </div>
              <button
                type="submit"
                className="editClientProfileSubmit btn-info"
                onClick={handleSubmit}
                data-dismiss="modal"
                aria-label="Close"
              >
                Update
              </button>
            </form>
          </div>
          <div class="modal-footer editClientProfileFooter">
            <button
              type="button"
              class="editClientProfileCloseButton btn-secondary"
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
