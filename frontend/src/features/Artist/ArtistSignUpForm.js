import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import Modal from "react-modal";
import axios from "axios";
import { updateArtist } from "../token/artistTokenSlice";
import { toggleModalState } from "../Artist/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import { useHistory } from "react-router-dom";
import "../../css/ArtistSignUpForm.css";

const ArtistSignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [pricing, setPricing] = useState("");
  const [contact_info, setContactInfo] = useState("");
  let isOpen = useSelector((state) => state.modal);
  // const [ isOpen, setIsOpen ] = useState(false)

  //imageUpload
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  const API = apiURL();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
  };

  const handleFirebaseUpload = () => {
    if (imageAsFile === "") {
      alert("Please choose a valid file before uploading");
    } else if (imageAsFile !== null) {
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageUrl(fireBaseUrl);
            });
        }
      );
      setToggleUploadMsg(true);
    } else {
      setToggleUploadMsg(false);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios.post(`${API}/artists`, {
        id: res.user.uid,
        name,
        profile_pic_url: imageUrl,
        bio,
        pricing,
        genre,
        city,
        contact_info,
      });
      await axios.post(`${API}/users`, {
        id: res.user.uid,
        type: "artist",
      });
      debugger;
      dispatch(updateArtist(res.user));
      debugger;
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    dispatch(toggleModalState());
    history.push("/");
  };

  return (
    // <Modal
    //   isOpen={true}
    //   onRequestClose={closeModal}
    //   isOpen={isOpen}
    //   style={{
    //     content: {
    //       backgroundColor: "#F4D8CD",
    //       borderRadius: "13px",
    //       left: "25%",
    //       right: "25%",
    //     },
    //     overlay: {
    //       backgroundColor: "#164444",
    //     },
    //   }}
    // >
      <div className={"FormContainer"}>
        <div className="artistSignUpTitle">
          <h3 id={"artisth3"}>Artist Sign Up</h3>
        </div>
        <div className="artistSignUpForm">
          <form onSubmit={handleSubmit} id="artistForm">
            <div className="artistInput">
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
                placeholder={"Band Name"}
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
                value={contact_info}
                onChange={(e) => setContactInfo(e.currentTarget.value)}
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
            </div>
            {/* Set Range: */}
            {/* <select>
                    <option value={"$"}>$</option>
                    <option value={"$$"}>$$</option>
                    <option value={"$$$"}>$$$</option>
                    <option value={"Ask"}>Ask</option>
                </select> */}
            <div className="artistSubmitButton">
              <input type="file" onChange={handleImageAsFile} required id="fileUpload" />

              <button
                type="button"
                onClick={() => {
                  handleFirebaseUpload();
                }}
                id="firebaseUpload"
              >
                Upload
              </button>

              {toggleUploadMsg ? <h5 id="uploadSuccess">Upload successful!</h5> : null}

              <button type={"submit"} id="submitArtist">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    // </Modal>
  
  );
};

export default ArtistSignUpForm;
