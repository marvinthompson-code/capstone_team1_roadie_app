import React, { useState } from "react";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import {updateClient} from '../client/clientSlice';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../css/clientSignUp.css";
// import { toggleModalState } from "../Artist/modalSlice";

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
      dispatch(updateClient(res.user));
      // sign up with firebase and send results to our backend
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <Modal
    //   isOpen={true}
    //   onRequestClose={closeModal}
    //   isOpen={isOpen}
    //   style={{
    //     content: {
    //       // backgroundColor: "#F4D8CD",
    //       borderRadius: "13px",
    //       left: "25%",
    //       right: "25%",
    //     },
    //     // overlay: {
    //     //   backgroundColor: "#164444",
    //     // },
    //   }}
    // >
    <div className="FormContainer">
      <div className="artistContainer">
      <h3 id={"artisth3"}>Client Sign Up</h3>
      </div>
      <div class="artistSignUpForm">
      <form onSubmit={handleSubmit} className="artistForm">
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          />
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          />
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"city"}
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          />
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"company name"}
          value={company}
          onChange={(e) => setCompany(e.currentTarget.value)}
          />
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"bio"}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
          />
        <input
          type={"text"}
          className={"artistInputSpace"}
          placeholder={"Contact Information"}
          value={contact}
          onChange={(e) => setContact(e.currentTarget.value)}
          />
        <input
          type={"password"}
          className={"artistInputSpace"}
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          />
        <div className="artistUploadImg">
          <p id="uploadHeader">img upload</p>
          <button
              onClick={(e) => setProfilePicUrl(e.currentTarget.value)}
              id="clientImg"
            >
              upload
            </button>
        </div>

        <input type="submit" className="artistSignUpBttn" value="Sign Up" />
      </form>
      </div>
      </div>
    );
  };
export default ClientSignUp;
