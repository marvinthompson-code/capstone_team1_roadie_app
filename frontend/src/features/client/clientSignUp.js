import React, { useState } from "react";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { toggleModalState } from "../Artist/modalSlice";

const ClientSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  let isOpen = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(toggleModalState());
  };

  const API = apiURL();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios.post(`${API}/clients`, {
        id: res.user.uid,
        name,
        profilePicUrl,
        bio,
        company,
        city,
        contact,
      });
      // dispatch(updateArtist(res.user));
      // sign up with firebase and send results to our backend
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={{
        content: {
          backgroundColor: "#F4D8CD",
          borderRadius: "13px",
          left: "25%",
          right: "25%",
        },
        overlay: {
          backgroundColor: "#164444",
        },
      }}
    >
      <h3>Client Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"city"}
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"company name"}
          value={company}
          onChange={(e) => setCompany(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"bio"}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"Contact Information"}
          value={contact}
          onChange={(e) => setContact(e.currentTarget.value)}
        />
        <input
          type={"password"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div className="clientSignUpImgUpload">
          <p>Upload Image</p>
          <input
            type="submit"
            value="upload"
            onClick={(e) => setProfilePicUrl(e.currentTarget.value)}
          />
        </div>

        <input type="submit" value="Sign Up" />
      </form>
    </Modal>
  );
};
export default ClientSignUp;
