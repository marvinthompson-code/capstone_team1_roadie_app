import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import "../../css/uploadModal.css";
import axios from "axios";

const UploadVideoModal = () => {
  // const [videoAsFile, setVideoAsFile] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  // const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const [caption, setCaption] = useState("");
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const API = apiURL();

  // const handleVideoAsFile = (e) => {
  //   const video = e.target.files[0];
  //   const types = ["video/mp4", "video/ogg", "video/quicktime", "video/mov"];
  //   if (types.every((type) => video.type !== type)) {
  //     alert(`${video.type} is not supported format`);
  //   } else {
  //     setVideoAsFile((videoFile) => video);
  //   }
  // };

  // const handleFirebaseVideoUpload = () => {
  //   if (videoAsFile === "") {
  //     alert(`Please choose a valid file before uploading`);
  //   } else if (videoAsFile !== null) {
  //     const uploadTask = storage
  //       .ref(`/videos/${videoAsFile.name}`)
  //       .put(videoAsFile);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapShot) => {
  //         var progress =
  //           (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         console.log(snapShot);
  //       },
  //       (err) => {
  //         console.log(err);
  //       },
  //       () => {
  //         storage
  //           .ref("videos")
  //           .child(videoAsFile.name)
  //           .getDownloadURL()
  //           .then((fireBaseUrl) => {
  //             debugger
  //             setVideoUrl(fireBaseUrl);
  //           });
  //       }
  //     );
  //     setToggleUploadMsg(true);
  //   } else {
    //     setToggleUploadMsg(false);
    //   }
    // };
    {/* <div className="custom-file">
      <input
        type="file"
        required
        className="custom-file-input uploadModalInput"
        id="customFile"
        onChange={handleVideoAsFile}
      />
      <label className="custom-file-label" for="customFile">
        Choose file
      </label>
    </div> */}
    {/* <button
      type="button"
      className="btn btn-primary activeButton"
      onClick={handleFirebaseVideoUpload}
    >
      Upload
    </button> */}
    {/* {toggleUploadMsg ? <h5>Upload successful!</h5> : null} */}
    
  const insertVideoIntoAlbum = async (e) => {
    e.preventDefault();
    if (artist === null) {
      try {
        await axios.post(`${API}/media/videos/`, {
          client_id: client.id,
          caption: caption,
          url: videoUrl,
        });
        setCaption("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(`${API}/media/videos/`, {
          artist_id: artist.id,
          caption: caption,
          url: videoUrl,
        });

      } catch (err) {
        console.log(err.message);
      }
    }
  };
  
  return (
    <div
      className="modal fade"
      id="uploadVideoModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header uploadModalHeader">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Upload Video
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
            <form onSubmit={insertVideoIntoAlbum}>
            <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Video Url Here..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control uploadModalInput"
                  placeholder="Enter Caption here..."
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={caption}
                  onChange={(e) => setCaption(e.currentTarget.value)}
                  required
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
export default UploadVideoModal;
