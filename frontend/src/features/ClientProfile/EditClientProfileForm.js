import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { toggleLoadingState } from "../Loading/loadingSlice";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import '../../css/EditClientProfileForm.css'

const EditClientProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_info, setContactInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  const match = useRouteMatch();
  const API = apiURL();

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
    await axios.patch(`${API}/clients/${match.params.id}`, {
      name,
      profile_pic_url: imageUrl,
      bio,
      contact_info,
    });
    dispatch(toggleLoadingState());
    dispatch(toggleLoadingState());
  };

  useEffect(() => {
    const fetchClientInfo = async (id) => {
      let res = await axios.get(`${API}/clients/${id}`);
      let { name, bio, contact_info } = res.data.body.single_client;
      setName(name);
      setBio(bio);
      setContactInfo(contact_info);
    };
    fetchClientInfo(match.params.id);
  }, []);

  const handleClick = () => {
    setToggle(true);
  };

  return (
    <div
      class="modal fade"
      id="editClientProfileModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header editClientProfileHeader">
            <h3 className="modal-title" id="exampleModalLongTitle">Edit Profile</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body editClientProfileBody">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="Name" id="lableitem">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control editClientProfileInput"
                  value={name}
                  id="Name"
                  placeholder={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlFile1" id="labelitem">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  onChange={handleImageAsFile}
                  required
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>

              <button
                type="button"
                className="clientUploadButton btn-secondary"
                onClick={() => {
                  handleFirebaseUpload();
                }}
                id="firebaseUpload"
              >
                Upload
              </button>
              {toggleUploadMsg ? (
                <h5 id="uploadSuccess" id="labelitem">
                  Upload successful!
                </h5>
              ) : null}

              <div className="form-group">
                <label for="Bio" id="lableitem">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control editClientProfileInput"
                  value={bio}
                  id="Bio"
                  placeholder={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="Contact_info" id="lableitem">
                  Contact Info
                </label>
                <input
                  type="text"
                  className="form-control editClientProfileInput"
                  value={contact_info}
                  id="Contact_info"
                  placeholder={contact_info}
                  onChange={(e) => setContactInfo(e.currentTarget.value)}
                />
              </div>
              <button
                type="submit"
                className="editClientProfileSubmit btn-info"
                onClick={handleSubmit}
                data-dismiss="modal"
                aria-label="Close"
              >
                Update
              </button>
            </form>
          </div>
          <div class="modal-footer editClientProfileFooter">
            <button
              type="button"
              class="editClientProfileCloseButton btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClientProfileForm;
