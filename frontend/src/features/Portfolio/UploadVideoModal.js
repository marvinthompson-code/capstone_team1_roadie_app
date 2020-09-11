import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiURL } from "../../util/apiURL";
import "../../css/uploadModal.css";
import axios from "axios";

const UploadVideoModal = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [source, setSource] = useState("");
  const [title, setTitle] = useState("");
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const API = apiURL();

  let videoSource = ["YouTube", "Facebook", "SoundCloud", "Vimeo", "Twitch"];

  const videoOptions = videoSource.map(video =>{
    return <option value={video} key={video}>{video}</option>
  })

  const insertVideoIntoAlbum = async (e) => {
    e.preventDefault();
    if (artist === null) {
      try {
        await axios.post(`${API}/media/videos/`, {
          client_id: client.id,
          caption: caption,
          url: videoUrl,
          title: title,
          source: source

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
          title: title,
          source: source
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
                  placeholder="Enter Video title..."
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="form-group">
                <select onChange={(e) => setSource(e.target.value)} value={source} class="custom-select">
                  <option value={""} disabled>Video Source</option>
                  {videoOptions}
                </select>
              </div>
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
