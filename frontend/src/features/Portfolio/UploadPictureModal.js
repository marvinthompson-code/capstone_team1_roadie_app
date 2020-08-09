import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toggleModalState} from './uploadModalSlice';
import Modal from "react-modal";
import { storage } from "../../firebase";

const UploadPictureModal = () => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  let isOpen = useSelector(state => state.uploadModal);
  const dispatch = useDispatch();
  const closeModal = () =>{
    dispatch(toggleModalState());
  }

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
              setImageUrl(fireBaseUrl);
            });
        }
      );
      setToggleUploadMsg(true);
    } else {
      setToggleUploadMsg(false);
    }
  };

  return (
    <Modal isOpen={false} onRequestClose={closeModal} isOpen={isOpen}>
      <input type="file" required onChange={handleImageAsFile} />
      <button type="button" onClick={handleFirebasePictureUpload}>
        Upload Picture
      </button>
      {toggleUploadMsg ? <h5>Upload successful!</h5> : null}
    </Modal>
  );
};

export default UploadPictureModal;