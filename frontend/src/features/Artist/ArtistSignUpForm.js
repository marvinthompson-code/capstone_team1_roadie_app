import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import Modal from "react-modal";
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
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [pricing, setPricing] = useState("");
  const [contact, setContact] = useState("");
  let isOpen = useSelector((state) => state.modal);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  // const [ isOpen, setIsOpen ] = useState(false)

  //imageUpload
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const API = apiURL();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
    debugger;
  };

  const handleFirebaseUpload = () => {
    // handleFireBaseUpload goes here
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      //initiates firebase side uploading
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageAsUrl((prevObject) => ({
                ...prevObject,
                imgUrl: fireBaseUrl,
              }));
            });
        }
      );
    }
    setProfilePicUrl(imageAsUrl.imgUrl);
    debugger;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      console.log("Show Artist", res);
      debugger;
      let res2 = await axios
        .post(`${API}/artist`, {
          id: res.user.uid,
          name,
          profilePicUrl,
          bio,
          pricing,
          genre,
          city,
          contact,
        })
        .then(() => {
          axios.post(`${API}/users`, {
            id: res.user.uid,
            type: "artist",
          });
        });
      debugger;
      dispatch(updateArtist(res.user));
      // history.push("/") to feed or artist profile, depends on what we want to do
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    dispatch(toggleModalState());
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
      <div className={"FormContainer"}>
        <div className="artistSignUpTitle">
          <h3 id={"artisth3"}>Artist Sign Up</h3>
        </div>
        <div className="artistSignUpForm">
          <form onSubmit={handleSubmit}>
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
            </div>
            {/* Set Range: */}
            {/* <select>
                    <option value={"$"}>$</option>
                    <option value={"$$"}>$$</option>
                    <option value={"$$$"}>$$$</option>
                    <option value={"Ask"}>Ask</option>
                </select> */}
            <div className="artistUploadImg">
              <input type="file" onChange={handleImageAsFile} required />
            </div>
            <div className="artistImgUploadBttn">
              <button onClick={handleFirebaseUpload}>Upload</button>
            </div>
            <div className="artistSignUpBttn">
              <button type={"submit"}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ArtistSignUpForm;
