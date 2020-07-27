import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./uploadModalSlice";
import Modal from "react-modal";
import { storage } from "../../firebase";

const UploadVideoModal = () => {
  const [videoAsFile, setVideoAsFile] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const [caption, setCaption] = useState("");

  let isOpen = useSelector((state) => state.uploadModal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModalState());
  };

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

  const handleSubmit = async (e) =>{
      e.preventDefault();
      try{

      }catch(err){
        console.log(err.message)
      }
  }

  return (
    <Modal isOpen={false} onRequestClose={closeModal} isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <input type="file" required onChange={handleVideoAsFile} />
        <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} required/>
        <button type="button" onClick={handleFirebaseVideoUpload}>
          Upload Video
        </button>
      </form>
      {toggleUploadMsg ? <h5>Upload successful!</h5> : null}
    </Modal>
  );
};
export default UploadVideoModal;
