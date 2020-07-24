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
  const [contact, setContact] = useState("");
  let isOpen = useSelector((state) => state.modal);

  //imageUpload
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const API = apiURL();
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
    debugger;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios
        .post(`${API}/clients`, {
          id: res.user.uid,
          name: name,
          profile_pic_url: imageAsUrl.imgUrl,
          bio,
          company,
          city,
          contact,
        })
        .then(() => {
          axios.post(`${API}/users`, {
            id: res.user.uid,
            type: "client",
          });
        });
      // add new axios call to add to user table
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
            <p id="uploadHeader">
              <input type="file" required onChange={handleImageAsFile} />
            </p>
            <button onClick={handleFirebaseUpload} id="clientImg">
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
