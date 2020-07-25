import React, { useState } from "react";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import { updateClient } from "../client/clientSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../css/clientSignUp.css";
// import { toggleModalState } from "../Artist/modalSlice";

const ClientSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");
  let isOpen = useSelector((state) => state.modal);
  //imageUpload

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const API = apiURL();
  const dispatch = useDispatch();

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFirebaseUpload = () => {
    if (imageAsFile !== null) {
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          var progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
              debugger;
            });
        }
      );
    } else {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios.post(`${API}/clients`, {
        id: res.user.uid,
        name: name,
        profile_pic_url: imageUrl,
        bio,
        company,
        city,
        contact_info,
      });
      await axios.post(`${API}/users`, {
        id: res.user.uid,
        type: "client",
      });
      dispatch(updateClient(res.user));
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
      <div className="artistSignUpForm">
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
            value={contact_info}
            onChange={(e) => setContactInfo(e.currentTarget.value)}
          />
          <input
            type={"password"}
            className={"artistInputSpace"}
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div className="artistUploadImg">
            <p id="uploadHeader">
              <input type="file" required onChange={handleImageAsFile} />
            </p>
            <button type="button" onClick={handleFirebaseUpload} id="clientImg">
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
