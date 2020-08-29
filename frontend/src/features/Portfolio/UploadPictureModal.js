import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./uploadModalSlice";
import Modal from "react-modal";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const UploadPictureModal = () => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const API = apiURL();

  const artist = useSelector((state) => state.artist);

  let isOpen = useSelector((state) => state.uploadModal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModalState());
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
    debugger
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
        debugger
      setToggleUploadMsg(true);
    } else {
      setToggleUploadMsg(false);
    }
  };

  const insertPictureIntoAlbum = async (e) => {
    e.preventDefault();
    debugger
    try {
       await axios.post(`${API}/media/pictures`, {
        artist_id: artist.id,
        caption: caption,
        url: imageAsUrl,
      });
      setCaption("")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={false} onRequestClose={closeModal} isOpen={isOpen}>
      <form onSubmit={insertPictureIntoAlbum}>
        <input type="file" required onChange={handleImageAsFile} />
        <input
          type="text"
          value={caption}
          required
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="button" onClick={handleFirebasePictureUpload}>
          Upload Picture
        </button>
        {toggleUploadMsg ? <h5>Upload successful!</h5> : null}
        <input type="submit" name="Click Here" />
      </form>
    </Modal>
  );
};

export default UploadPictureModal;
