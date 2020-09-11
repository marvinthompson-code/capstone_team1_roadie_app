import React, { useState, useEffect } from "react";
import { toggleLoadingState } from '../Loading/loadingSlice';
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import '../../css/EditArtistProfileForm.css'

const EditArtistProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");
  const [ toggle, setToggle ] = useState(false)
  const dispatch = useDispatch()

  const match = useRouteMatch();
  const API = apiURL();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.patch(`${API}/artists/info/${match.params.id}`, {
      name,
      bio,
      contact_info,
    });
    dispatch(toggleLoadingState())
    dispatch(toggleLoadingState())
    window.location.reload();
  };

  useEffect(() => {
    const fetchArtistInfo = async (id) => {
      let res = await axios.get(`${API}/artists/${id}`);
      let { name, bio, contact_info } = res.data.body.single_artist;
      setName(name);
      setBio(bio);
      setContactInfo(contact_info);
    };
    fetchArtistInfo(match.params.id);
  }, []);

  const handleClick = () => {
    setToggle(true)
  }

  return (
    <div
      className="modal fade"
      id="editArtistProfileModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header editArtistProfileHeader">
            <h3 className="modal-title" id="exampleModalLongTitle">
              Edit Profile
              </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body editArtistProfileBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="Name" id="labelitem">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control editArtistProfileInput"
                  value={name}
                  id="Name"
                  placeholder={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>

              <div className="form-group">
                <label for="Bio" id="labelitem">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control editArtistProfileInpu"
                  value={bio}
                  id="Bio"
                  placeholder={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="Contact_info" id="labelitem">
                  Contact Info
                </label>
                <input
                  type="text"
                  className="form-control editArtistProfileInput"
                  value={contact_info}
                  id="Contact_info"
                  placeholder={contact_info}
                  onChange={(e) => setContactInfo(e.currentTarget.value)}
                />
              </div>

              <button type="submit" className="editArtistProfileSubmit btn-info" onClick={handleSubmit} data-dismiss="modal" aria-label="Close">
                Update
              </button>
            </form>
          </div>
          <div className="modal-footer  editArtistProfileFooter">
            <button
              type="button"
              className="editArtistProfileCloseButton btn-secondary"
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

export default EditArtistProfileForm;
