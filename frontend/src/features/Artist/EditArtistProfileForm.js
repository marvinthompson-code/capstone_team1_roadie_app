import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { toggleEditArtistProfileModalState } from "./editArtistProfileModalSlice";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import Modal from "react-modal";
import axios from "axios";

const EditArtistProfileForm = () => {
  let isOpen = useSelector((state) => state.editArtistProfileModal);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");

  const match = useRouteMatch();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update Artist information
    let res = await axios.patch(`${API}/artists/${match.params.id}`);
  };

  const closeModal = () => {
    dispatch(toggleEditArtistProfileModalState());
  };

  useEffect(() => {
    const fetchArtistInfo = async (id) => {
      let res = await axios.get(`${API}/artists/${id}`);
      let {
        name,
        profile_pic_url,
        bio,
        city,
        contact_info,
      } = res.data.body.single_artist;
      setName(name);
      setBio(bio);
      setContactInfo(contact_info);
    };
    // we can also use useParams, ive just been using this lately. Takes the id straight from the url, and since this is a modal, the ending of the url doesnt change, so aye
    fetchArtistInfo(match.params.id);
    // call the function here ^^^
  }, []);
  return (
    <Modal
      isOpen={false}
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={{
        content: {
          backgroundColor: "#F4D8CD",
          borderRadius: "13px",
          left: "25%",
          right: "25%",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="Name">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            id="Name"
            placeholder={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label for="Bio">Bio</label>
          <input
            type="text"
            className="form-control"
            value={bio}
            id="Bio"
            placeholder={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="Contact_info">Contact Info</label>
          <input
            type="text"
            className="form-control"
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
    </Modal>
  );
};

export default EditArtistProfileForm;
