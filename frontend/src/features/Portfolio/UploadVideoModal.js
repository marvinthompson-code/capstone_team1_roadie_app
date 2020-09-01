import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const UploadVideoModal = () => {
  const [videoAsFile, setVideoAsFile] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const [caption, setCaption] = useState("");
  const artist = useSelector((state) => state.artist);
  const API = apiURL();

  const handleVideoAsFile = (e) => {
    const video = e.target.files[0];
    const types = ["video/mp4", "video/ogg", "video/quicktime", "video/mov"];
    if (types.every((type) => video.type !== type)) {
      alert(`${video.type} is not supported format`);
    } else {
      setVideoAsFile((videoFile) => video);
    }
  };

  const handleFirebaseVideoUpload = () => {
    if (videoAsFile === "") {
      alert(`Please choose a valid file before uploading`);
    } else if (videoAsFile !== null) {
      const uploadTask = storage
        .ref(`/videos/${videoAsFile.name}`)
        .put(videoAsFile);
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
            .ref("videos")
            .child(videoAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setVideoUrl(fireBaseUrl);
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
      await axios.post(`${API}/media/artists/${artist.id}/videos`, {
        caption: caption,
        url: videoUrl,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      class="modal fade"
      id="uploadVideoModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Upload Video
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit}>
              <input type="file" required onChange={handleVideoAsFile} />
              <input
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.currentTarget.value)}
                required
              />
              <button type="button" onClick={handleFirebaseVideoUpload}>
                Upload Video
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
          <div>{toggleUploadMsg ? <h5>Upload successful!</h5> : null}</div>
        </div>
      </div>
    </div>
  );
};
export default UploadVideoModal;
