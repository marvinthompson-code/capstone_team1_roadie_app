import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import Modal from "react-modal";
import axios from "axios";
import { updateArtist } from "../token/artistTokenSlice";
import { toggleModalState } from "../Artist/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";


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
  
      dispatch(updateArtist(res.user));
  
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
      <div className="form-group">
      <div className="modal-header">
        <h3 className="modal-title" id="exampleModalLongTitle">Artist Sign Up</h3>
      </div>
          <form onSubmit={handleSubmit} id="artistForm">
            
          <div className="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control artistSignUpInput"
                placeholder="Artist Name.."
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
                ></input>
                </div>
        <div className="form-group">
        <label for="exampleInputEmail1">Email</label>
            <div className="artistInput">
              <input
                type="email"
                className="form-control artistSignUpInput"
                placeholder="Artist Email.."
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
                ></input>
                </div>

              <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control  artistSignUpInput"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                ></input>
                </div>

              <div className="form-group">
              <label for="exampleInputEmail1">Genre</label>
              <input
                type="text"
                className="form-control artistSignUpInput"
                placeholder="Artist Genre.."
                value={genre}
                onChange={(e) => setGenre(e.currentTarget.value)}
                required
                ></input>
                </div>

              <div className="form-group">
              <label for="exampleInputEmail1">Contact/Phone Number</label>
              <input
                type="text"
                className="form-control artistSignUpInput"
                placeholder="Artist Contact Information.."
                value={contact_info}
                onChange={(e) => setContactInfo(e.currentTarget.value)}
                required
                ></input>
                </div>

              <div className="form-group">
              <label for="exampleInputEmail1">Bio</label>
              <input
                type="text"
                className="form-control artistSignUpInput"
                placeholder="Artist Bio.."
                value={bio}
                onChange={(e) => setBio(e.currentTarget.value)}
                ></input>
                </div>

              <div className="form-group">
              <label for="exampleInputEmail1">City</label>
              <input
                type="text"
                className="form-control artistSignUpInput"
                placeholder="Artist City.."
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                ></input>
                </div>

              </div>
            <div className="form-group">
            <label for="exampleFormControlFile1">Upload Profile Image</label>
              <input type="file"
               onChange={handleImageAsFile}
               required
               className="form-control-file"
               id="exampleFormControlFile1"
               />
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  handleFirebaseUpload();
                }}
                id="firebaseUpload"
                >
                Upload
              </button>
              {toggleUploadMsg ? <h5 id="uploadSuccess">Upload successful!</h5> : null}
              <input
             type="submit" className="btn btn-primary" value="Sign Up" 
             />
          </form>
      </div>
  );
};

export default ArtistSignUpForm;
