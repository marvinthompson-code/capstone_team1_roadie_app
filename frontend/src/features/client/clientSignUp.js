import React, { useState } from "react";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import { updateClient } from "../token/clientTokenSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ClientSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");
  const history = useHistory()
  let isOpen = useSelector((state) => state.modal);

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const API = apiURL();
  const dispatch = useDispatch();

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
              debugger
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
      debugger
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
      history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="FormContainer">
      <div className="modal-header">
        <h3 className="modal-title" id="exampleModalLongTitle">Client Sign Up</h3>
      </div>
        <form onSubmit={handleSubmit}>

      <div className="form-group">
      <label for="exampleInputEmail1" id="labelItem">Name</label>
          <div className="artistInput">
            <input
              type="text"
              className="form-control clientSignUpInput"
              placeholder={"Client Name.."}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              />
              </div>

            <div className="form-group">
            <label for="exampleInputEmail1" id="labelItem">Email</label>
            <input
              type="email"
              className="form-control clientSignUpInput"
              placeholder="Client Email.."
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              id="exampleInputEmail1" aria-describedby="emailHelp"
              />
              </div>
            
            <div class="form-group clientSignUpInput">
            <label for="exampleInputPassword1" id="labelItem">Password</label>
            <input
              type="password"
              className="form-control clientSignUpInput"
              placeholder={"Client Password.."}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              id="exampleInputPassword1" 
              />
              </div>

            <div className="form-group">
            <label for="exampleInputEmail1" id="labelItem">City</label>
            <input
              type="text"
              className="form-control clientSignUpInput"
              placeholder="Client City.."
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
              />
              </div>

               
            <div className="form-group">
            <label for="exampleInputEmail1" id="labelItem">Contact Info/Phone Number</label>
            <input
              type="text"
              className="form-control clientSignUpInput"
              placeholder={"Client Contact Information.."}
              value={contact_info}
              onChange={(e) => setContactInfo(e.currentTarget.value)}
              />
              </div>

            <div className="form-group">
            <label for="exampleInputEmail1" id="labelItem">Company</label>
            <input
              type="text"
              className="form-control clientSignUpInput"
              placeholder={"Client Company.."}
              value={company}
              onChange={(e) => setCompany(e.currentTarget.value)}
              />
              </div>

            <div className="form-group">
            <label for="exampleInputEmail1" id="labelItem">Bio</label>
            <input
              type="text"
              className="form-control clientSignUpInput"
              placeholder="Client Bio.."
              value={bio}
              onChange={(e) => setBio(e.currentTarget.value)}
              />
              </div>
           

           


          </div>
          <div className="form-group">
          <label for="exampleFormControlFile1" id="labelItem">Upload Profile Image</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              required
              onChange={handleImageAsFile}
              />
              </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleFirebaseUpload}
              id="firebaseUpload"
            >
              upload
            </button>
            {toggleUploadMsg ? (
              <h5 id="labelItem">Upload successful!</h5>
            ) : null}

            <input
             type="submit" className="btn btn-primary" value="Sign Up" 
             />
          
        </form>
    </div>
  );
};
export default ClientSignUp;
