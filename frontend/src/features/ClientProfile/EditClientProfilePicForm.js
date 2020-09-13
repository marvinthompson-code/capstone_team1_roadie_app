import React, { useState } from "react";
import { storage } from "../../firebase";
import { toggleLoadingState } from '../Loading/loadingSlice';
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { apiURL } from "../../util/apiURL";
import axios from "axios";
// import "../../css/EditClientProfilePicForm.css";

const EditClientProfilePicForm = () => {
    const [toggle, setToggle] = useState(false);
    const [imageAsFile, setImageAsFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

    const dispatch = useDispatch();
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
        let res = await axios.patch(`${API}/clients/${match.params.id}`, {
          profile_pic_url: imageUrl
        });
        dispatch(toggleLoadingState())
        dispatch(toggleLoadingState())
      };

    const handleClick = () => {
        setToggle(true)
    };

    return (
        <div 
            className="modal fade" 
            id="editClientProfilePicModalCenter" 
            tabindex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalCenterTitle" 
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content artistEditProfilePicContent">
                    <div className="modal-header editArtistProfilePicHeader">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Edit Profile Picture
                        </h5>
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={handleClick}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body editArtistProfilePicBody">
                        <form onSubmit={handleSubmit} className="formEditArtistProfilePic">
                            <div className="form-group">
                                <label for="exampleFormControlFile1" id="labelitem" className="fileEditArtistProfilePic">
                                Upload Profile Image
                                </label>
                                <input
                                type="file"
                                onChange={handleImageAsFile}
                                required
                                className="form-control-file formControlEditArtistProfilePic"
                                id="exampleFormControlFile1"
                                />
                            </div>
                            <button
                                type="button"
                                className="artistUploadProfileButton btn-secondary"
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
                            <button type="submit" className="editArtistProfilePicSubmit btn-info" onClick={handleSubmit} data-dismiss="modal" aria-label="Close">
                                Update
                            </button>
                        </form>
                    </div>
                    <div className="modal-footer editArtistProfilePicFooter">
                        <button 
                            type="button" 
                            className="editArtistProfilePicCloseBtn btn-secondary" 
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditClientProfilePicForm;