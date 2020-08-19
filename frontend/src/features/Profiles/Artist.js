import React from "react";
import ArtistProfile from "../Artist/ArtistProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import BookMeForm from "../Artist/BookMeForm";
import "../../css/Profiles/Artist.css";

const Artist = () => {
  return (
    <div className="realArtistProfile container-fluid">
      <div className="row justify-content-md-center">
        <ArtistProfile />
      </div>
      <div className="row">
        <UploadPictureModal />
      </div>
      <div className="row">
        <UploadVideoModal />
      </div>
      <div className="row">
      <BookMeForm />
      </div>
    </div>
  );
};

export default Artist;
