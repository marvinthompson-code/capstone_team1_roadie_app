import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "../../firebase";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";

const ArtistPortfolio = () => {
  const artist = useSelector((state) => state.artist);
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [caption, setCaption] = useState("");
  const [pictures, setPictures] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  const API = apiURL();
  const match = useRouteMatch();

  //imageUpload
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
  };

  const handleFirevaseUpload = () => {
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

  const insertPictureIntoAlbum = async () => {
    try {
      await axios.post(`${API}/media/pictures`, {
        artist_id: artist.id,
        caption: caption,
        url: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchArtist = async (id) => {
      let res = await axios.get(`${API}/artists/${id}`);
      let { name, profile_pic_url } = res.data.body.single_artist;
      setName(name);
      setProfilePic(profile_pic_url);
    };
    const fetchArtistPictures = async (id) => {
      let res = await axios.get(`${API}/media/artists/${id}/pictures`);
      let { picture } = res.data.body.picture;
      setPictures(picture);
    };
    const fetchArtistVideos = async (id) => {
      let res = await axios.get(`${API}/media/artists/${id}/videos`);
      let { video } = res.data.body.video;
      setVideos(video);
    };
    fetchArtist(match.params.id);
    fetchArtistPictures(match.params.id);
    fetchArtistVideos(match.params.id);
  }, []);

  return (
    <div className="artistPortfolioContainer">
      <div className="portfolioHeader">
        <img src={profilePic} />
        <button>Book Me!</button>
      </div>
      <div className="artistName">
        <h1>{name}</h1>
      </div>
      <div className="artistMediaContainer">
        <div className="artistAlbumDiv">
          <h2>{name}'s Album</h2>
          <input type="file" required onChange={handleImageAsFile} />
          <button type="button" onClick={handleFirevaseUpload}>
            Upload Picture
          </button>
          {toggleUploadMsg ? <h5>Upload successful!</h5> : null}
        </div>
        <div className="artistVideoDiv">
          <h2>{name}'s Videos</h2>
          <button>Upload Video</button>
        </div>
      </div>
    </div>
  );
};
export default ArtistPortfolio;
