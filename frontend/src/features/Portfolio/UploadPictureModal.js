import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import "../../css/uploadModal.css";
const UploadPictureModal = () => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const API = apiURL();

  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
  };

  const handleFirebasePictureUpload = () => {
    if (imageAsFile === "") {
      alert(`Please choose a valid file before uploading`);
    } else if (imageAsFile !== null) {
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
              setImageAsUrl(fireBaseUrl);
            });
        }
      );
      setToggleUploadMsg(true);
    } else {
      setToggleUploadMsg(false);
    }
  };

  const insertPictureIntoAlbum = async (e) => {
    e.preventDefault();
    if (artist === null) {
      try {
        await axios.post(`${API}/media/pictures`, {
          client_id: client.id,
          caption: caption,
          url: imageAsUrl,
        });
        setCaption("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(`${API}/media/pictures`, {
          artist_id: artist.id,
          caption: caption,
          url: imageAsUrl,
        });
        setCaption("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="uploadPictureModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header uploadModalHeader">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Upload Picture
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body uploadModalBody">
            <form onSubmit={insertPictureIntoAlbum}>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input uploadModalInput"
                  id="customFile"
                  required
                  onChange={handleImageAsFile}
                />
                <label className="custom-file-label" for="customFile">
                  Choose file
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary activeButton"
                onClick={handleFirebasePictureUpload}
              >
                Upload
              </button>
              {toggleUploadMsg ? <h5>Upload successful!</h5> : null}
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control uploadModalInput"
                  id="exampleFormControlTextarea1"
                  placeholder="Enter Caption here..."
                  rows="3"
                  value={caption}
                  required
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="btn btn-primary activeButton"
                name="Click Here"
              />
            </form>
          </div>
          <div className="modal-footer uploadModalBody">
            <button
              type="button"
              className="btn btn-secondary uploadModalCloseButton"
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

export default UploadPictureModal;
