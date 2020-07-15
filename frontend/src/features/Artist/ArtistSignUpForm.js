import React, { useState } from "react";
import axios from "axios";
import { updateArtist } from "../Artist/artistSlice";
import { toggleModalState } from "../Artist/modalSlice";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "../../css/ArtistSignUpForm.css";

const ArtistSignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [pricing, setPricing] = useState("");
  const [contact, setContact] = useState("");
  let isOpen = useSelector((state) => state.modal);
  // const [ isOpen, setIsOpen ] = useState(false)

  const API = apiURL();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      debugger;
      console.log("Show Artist", res);
      let res2 = await axios.post(`${API}/artists/`, {
        id: res.user.uid,
        name,
        profilePicUrl,
        bio,
        pricing,
        genre,
        city,
        contact,
      });
      debugger;
      dispatch(updateArtist(res.user));
      // history.push("/") to feed or artist profile, depends on what we want to do
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"FormContainer"}>
      <div className="artistContainer">
        <h3 id={"artisth3"}>Artist Sign Up</h3>
      </div>
      <div className="artistSignUpForm">
        <form onSubmit={handleSubmit} className="artistForm">
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"email"}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          ></input>
          <input
            type={"password"}
            className={"artistInputSpace"}
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          ></input>
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"band name"}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          ></input>
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"genre"}
            value={genre}
            onChange={(e) => setGenre(e.currentTarget.value)}
            required
          ></input>
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"contact"}
            value={contact}
            onChange={(e) => setContact(e.currentTarget.value)}
            required
          ></input>
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"bio"}
            value={bio}
            onChange={(e) => setBio(e.currentTarget.value)}
          ></input>
          <input
            type={"text"}
            className={"artistInputSpace"}
            placeholder={"city"}
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
          ></input>
          <div className="artistUploadImg">
            <p id="uploadHeader">img upload:</p>
            <button
              onClick={(e) => setProfilePicUrl(e.currentTarget.value)}
              id="artistImg"
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

export default ArtistSignUpForm;
